//code by Dhiraj

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
    new User({
      _id: new mongoose.Types.ObjectId(),
      f_name: f_name,
      l_name: l_name,
      u_name: u_name,
      p_hash: createPasswordHash(password), //hashing the password
    })
      .save()
      .then((newUser) => {
        //if the url query has referrer then perform database transaction to do following things
        //1: increment the uearn coins of referrer by value defined in enviorenment
        //2: add new referral history document
        if (referrerId && referrerId.length === 24) {
          async function ReferrerRewardTransction() {
            const transactionSession = await mongoose.startSession();
            try {
              transactionSession.startTransaction();

              const referrer_user_doc = await User.findById(referrerId);

              //check if there is any user with  referredId if not then thwor error which will abort the transaction
              if (!referrer_user_doc) {
                throw Error("No user exists with _id: " + referrerId);
              }
              await new ReferralHistory({
                _id: new mongoose.Types.ObjectId(),
                referrer_user_id: new mongoose.Types.ObjectId(referrerId),
                referred_user_id: new mongoose.Types.ObjectId(newUser._id),
                reward_amount: Number(process.env.REFERRER_REWARD_UNIT),
              }).save();

              referrer_user_doc.uearn_coins =
                referrer_user_doc.uearn_coins +
                Number(process.env.REFERRER_REWARD_UNIT);

              await referrer_user_doc.save();

              await transactionSession.commitTransaction();
            } catch (error) {
              console.log(error);
              await transactionSession.abortTransaction();
            } finally {
              await transactionSession.endSession();
            }
          }
          ReferrerRewardTransction()
            .then(() => {
              res.json({ success: true, data: null });
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          res.json({ success: true, data: null });
        }
      })
      .catch((e) => {
        console.log(e);
        res
          .status(500)
          .json({ success: false, error: "Something went Wrong!" });
      });
  }
}
