//code by Kamini updated by Dhiraj

//the url will be something linke /api/user-info/?query=f_name,uearn_coins
//get the search parameter named query using "req.query['query']" it will be an serialized array if no query parameter is found respond invalid request
//query parameter will be an array (check if it is actually a valid array) check all the elements on the fields in User mongoose model remove the elements from array if it does not exists
//get u_uid from request  => req['uid']
//make a findone request using mongoose with mongoose search parameter _id ,  use projection to only get the fields that is in the array

import User from "../Models/User.mjs";

export default async function GetUserInfo(req, res) {
  let query = req.query["query"];
  const userId = req["uid"];

  if (query) {
    try {
      query = query.split(",");
      const allowedQueryFields = ["f_name", "l_name", "u_name", "uearn_coins"];
      let projectionString = "_id ";
      query.forEach((field) => {
        if (allowedQueryFields.includes(field)) {
          projectionString += `${field} `;
        }
      });
      User.findById(userId, projectionString)
        .then((userDoc) => {
          if (userDoc) {
            res.json(userDoc);
          } else {
            res
              .status(500)
              .json({ success: false, error: "Something went wrong" });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      res.status(400).json({ success: false, error: "Invalid query" });
    }
  } else {
    res.status(400).json({ success: false, error: "No queries found" });
  }
}
