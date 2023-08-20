import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectToDatabase from "./HelperFunctions/connectToDatabase.mjs";

//request handlers
import Login from "./RequestHandlers/Login.mjs";
import Signup from "./RequestHandlers/Signup.mjs";
import CheckUsername from "./RequestHandlers/CheckUsername.mjs";
import GetUserInfo from "./RequestHandlers/GetUserInfo.mjs";
import CheckLoginStatus from "./RequestHandlers/CheckLoginStatus.mjs";

//middelwares
import AuthenticateUser from "./Middlewares/AuthenticateUser.mjs";
import cookieParser from "cookie-parser";
import Logout from "./RequestHandlers/LogOut.mjs";
import GetReferralHistory from "./RequestHandlers/GetReferralHistory.mjs";

/**
 * @description Creates new express server instance
 * @returns {Promise}
 */
export default async function app() {
  await connectToDatabase().catch((error) => {
    console.error("Error connecting to the database:", error);
    //kill the process if can't connect to database
    process.exit(1);
  });

  const app = express();
  //middelware to accept request from cross-origin
  app.use(cors());
  //middelware to parse json body present in requests
  app.use(bodyParser.json());
  //middelware to parse cookies
  app.use(cookieParser());

  // open routes
  app.post("/api/login", Login);
  app.post("/api/signup", Signup);

  app.get("/api/check-username/:userName", CheckUsername);

  app.get("/api/login-status", CheckLoginStatus);

  //authenticated routes
  app.get("/api/user-info", AuthenticateUser, GetUserInfo);
  app.get("/api/logout", AuthenticateUser, Logout);
  app.get("/api/referral-history", AuthenticateUser, GetReferralHistory);

  app.listen(process.env.PORT, () => {
    console.log(
      `${new Date()}: Server instance with process id:${
        process.pid
      } listning at port: ${process.env.PORT}`
    );
  });
}
