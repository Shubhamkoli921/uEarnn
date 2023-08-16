//nearly same as Authenticateuser middelware
//but it will respond {success:true data:"loggedin"} if token verification is successfull
//if verification fails it will respond {success:true, data:"loggedoff"}

import User from "../Models/User.mjs";
import AuthenciateUser from '../middlewareAuthenciateUser'
import {jwt} from 'jsonwebtoken';
export default function CheckLoginStatus(req, res) {
    try{
        
        const loginStatus = req.params["loginStatus"];
        if(loginStatus){
const body =req.body;

// checkLoginStatus

User.findOne({l_status: loginStaus},body,function(err,data){
if(err) throw err;

return res.status(201).send({ msg : "Userfound..!"})
})
        }else{
            return res.status(400).send({ error: "User Not Found..!"});
        }

    } catch (error) {
        return res.status(400).send({error});
    }
}
//auth middleware

export default function AuthenticateUser(req, res, next) {
    try{
        const token = req.headers.authorization.split(" ")[1];

   const decodedToken = await jwt.verify(token,ENV.JWT_SECRET);
   req.user =decodedToken;
        res.json(token);
    }catch (error) {
        res.status(400).json({error:"Authentication Failed"})
    }
}
  

