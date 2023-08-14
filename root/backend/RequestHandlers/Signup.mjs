//after the introduction of payment, there will be need of changes
import {
  isValidName,
  isValidPassword,
  isValidUsername,
} from "../HelperFunctions/formFieldValidators.mjs";
import User from "../Models/User.mjs";
import { createPasswordHash } from "../HelperFunctions/passwordUtils.mjs";
import mongoose from "mongoose";
import ReferralHistory from "../Models/ReferralHistory.mjs";

export default function Signup(req, res) {
  const { f_name, l_name, u_name, password } = req["body"];

  //get the referrer id from url query
  const referrerId = req.query["referrer"];

  //validating the form data
  if (
    !f_name ||
    !isValidName(f_name) ||
    !l_name ||
    !isValidName(l_name) ||
    !u_name ||
    !isValidUsername(u_name) ||
    !password ||
    !isValidPassword(password)
  ) {
    //if form data is invalid send 400 status code
    res.status(400).json({ success: false, error: "Invalid form data!" });
  } else {
    //function to perform database transaction to store new user's data in users collection and referralhistories collection
    async function newUserCreationTransaction() {
      const userCreationTransactionSession = await mongoose.startSession();
      try {
        userCreationTransactionSession.startTransaction();
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          f_name: f_name,
          l_name: l_name,
          u_name: u_name,
          p_hash: createPasswordHash(password), //hashing the password
        });
        await newUser.save();
        const newUserReferralHistory = new ReferralHistory({
          _id: newUser._id,
          history: [],
        });
        await newUserReferralHistory.save();

        //if the url query has referrer then perform database transaction to do following things
        //1: increment the uearn coins of referrer by value defined in enviorenment
        //2: push the new user's first name and last name in referrer's referral history
        if (referrerId) {
          async function ReferrerRewardTransction() {
            const transactionSession = await mongoose.startSession();
            try {
              transactionSession.startTransaction();
              const referrarReferralHistory = await ReferralHistory.findById(
                referrerId
              );
              referrarReferralHistory.history.push({
                l_name: newUser.l_name,
                f_name: newUser.f_name,
              });
              await referrarReferralHistory.save();
              const referrerUser = await User.findById(referrerId);
              referrerUser.uearn_coins =
                referrerUser.uearn_coins +
                Number(process.env.REFERRER_REWARD_UNIT);
              await referrerUser.save();
              await transactionSession.commitTransaction();
            } catch (error) {
              await transactionSession.abortTransaction();
            } finally {
              transactionSession.endSession();
            }
          }
          ReferrerRewardTransction()
            .then(() => {
              //kind of have to do nothing here, because it is going to be redirected anyhow after execution of newUserCreationTransaction
            })
            .catch((e) => {
              console.log(e);
            });
        }
      } catch (e) {
        await userCreationTransactionSession.abortTransaction();
      } finally {
        await userCreationTransactionSession.endSession();
      }
    }
    newUserCreationTransaction()
      .then(() => {
        //after everything is done redirect the user to /login page
        res.redirect("/login");
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
