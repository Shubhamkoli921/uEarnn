import verifyAuthToken from "../HelperFunctions/Auth/verifyAuthToken.mjs";

export default function AuthenticateUser(req, res, next) {
  const authenticationToken = req.cookie["AuthToken"];

  if (!authenticationToken) {
    //case when authentication token is not available in the cookie, redirecting user
    res.redirect("/login");
  }
  const decodedToken = verifyAuthToken(authenticationToken);
  if (decodedToken) {
    req.uid = decodedToken["uid"];
    next();
  } else {
    //case when authentication token is invalid redirection user to login page
    res.redirect("/login");
  }
}
