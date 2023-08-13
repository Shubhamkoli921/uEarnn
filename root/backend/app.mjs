import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

//request handlers
import Hello from "./RequestHandlers/Hello.mjs";

/**
 * @description Creates new express server instance
 * @returns {Promise}
 */
export default async function app() {
  return new Promise(async (resolve, reject) => {
    const app = express();
    //middelware to accept request from cross-origin
    app.use(cors());
    //middelware to parse json body present in requests
    app.use(bodyParser.json());

    app.get("/hello", Hello);

    app.listen(process.env.PORT, () => {
      console.log(
        `${new Date()}: Server instance with process id:${
          process.pid
        } listning at port: ${process.env.PORT}`
      );
    });
  });
}
