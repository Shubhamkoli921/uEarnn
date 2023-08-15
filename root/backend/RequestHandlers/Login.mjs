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
import bcrypt from 'bcrypt';
import {jwt} from "jsonwebtoken";

export async function login(req,res){
    const{ username,password}=req.body;

    try{
        User.findOne({username})
        .then(user =>{
            bcrypt.compare(password,user.password)
            .then(passwordCheck =>{
                if(!passwordCheck) return res.status(400).send({error:"Don't have password"});

                //create jwt token
                const token= jwt.sign({
                    userId: user._id,
                    username : user.username
                
                }, ENV.JWT_SECRET, {expiresIN:"24h"});

                return res.status(200).send({
                    msg:"Login Successful..!",
                    username:user.username,
                    token
                });

            })
            .catch(error =>{
                return res.status(400).send({error:"password does not Match"})
            })
            
        })
        .catch(error =>{
            return res.status(404).send({error :"Usename not found"});
        })
    }catch (error) {
        return res.status(500).send({error});
    }
}
