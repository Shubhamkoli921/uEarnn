//code by Kamini updated by Dhiraj

//todo get the userdata in req.body format: {u_name String, password:String}
//use passwordHash function to hash the password in request body
//check if such user exists in our database
//if user exists
//  check if the hashed passwords matches with users p_hash value
//      if password matches
//          create a authToken using createAuthToken function and save that authToken in user cookie in format "Bearer authToken" and the cookie should be of type http-only and redirect user to '/dashboard
//      else
//          send reponse {success:false, error:"Invalid username or password!"}
//  else
//      send reponse {success:false, error:"Invalid username or password!"}

// export default function Login(req, res) {}

import User from "../Models/User.mjs";
import { comparePasswordHash } from "../HelperFunctions/passwordUtils.mjs";
import { createAuthToken } from "../HelperFunctions/Auth/authTokenUtils.mjs";
import {
  isValidUsername,
  isValidPassword,
} from "../HelperFunctions/formFieldValidators.mjs";
import daysjs from "dayjs";

export default function login(req, res) {
  const { u_name, password } = req.body;

  //validating the form data
  if (
    !u_name ||
    !isValidUsername(u_name) ||
    !password ||
    !isValidPassword(password)
  ) {
    //if form data is invalid send 400 status code
    res.status(400).json({ success: false, error: "Invalid form data!" });
  } else {
    User.findOne({ u_name: u_name }, "_id p_hash")
      .then((user) => {
        if (user) {
          if (comparePasswordHash(password, user.p_hash)) {
            res.cookie(
              "authToken",
              `Bearer ${createAuthToken({ uid: user._id })}`,
              {
                httpOnly: true,
                secure: true,
                expires: daysjs().add(30, "days").toDate(),
              }
            );
            res.json({ success: true, data: null });
          } else {
            res.status(404).json({
              success: false,
              error: "Invalid username or password!",
            });
          }
        } else {
          res.status(404).json({
            success: false,
            error: "Invalid username or password!",
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          error: "Something went wrong!",
        });
      });
  }
}
