//code by Dhiraj

import { verifyAuthToken } from "../HelperFunctions/Auth/authTokenUtils.mjs";

export default function AuthenticateUser(req, res, next) {
  const authenticationToken = req.cookies["authToken"];

  if (!authenticationToken) {
    //case when authentication token is not available in the cookie, redirecting user
    res.redirect("/login");
  } else {
    const decodedToken = verifyAuthToken(authenticationToken.split(" ")[1]);
    if (decodedToken) {
      req.uid = decodedToken["uid"];
      next();
    } else {
      //case when authentication token is invalid redirection user to login page
      res.redirect("/login");
    }
  }
}
