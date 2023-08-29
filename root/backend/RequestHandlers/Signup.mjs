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
      is_referred: referrerId && referrerId.length === 24 ? true : false,
      referrer_id: referrerId && referrerId.length === 24 ? referrerId : null,
    })
      .save()
      .then((newUser) => {
        res.json({ success: true, data: null });
      })
      .catch((e) => {
        console.log(e);
        res
          .status(500)
          .json({ success: false, error: "Something went Wrong!" });
      });
  }
}
