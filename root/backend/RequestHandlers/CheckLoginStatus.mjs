//code by Kamini updated by Dhiraj

//nearly same as Authenticateuser middelware
//but it will respond {success:true data:"loggedin"} if token verification is successfull
//if verification fails it will respond {success:true, data:"loggedoff"}

import { verifyAuthToken } from "../HelperFunctions/Auth/authTokenUtils.mjs";

export default function CheckLoginStatus(req, res) {
  const authenticationToken = req.cookies["authToken"];

  if (!authenticationToken) {
    //case when authentication token is not available in the cookie, redirecting user
    res.json({ success: true, data: "loggedoff" });
  } else {
    const decodedToken = verifyAuthToken(authenticationToken.split(" ")[1]);
    if (decodedToken) {
      res.json({ success: true, data: "loggedin" });
    } else {
      //case when authentication token is invalid redirection user to login page
      res.json({ success: true, data: "loggedoff" });
    }
  }
}
