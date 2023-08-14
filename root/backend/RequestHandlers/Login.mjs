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

export default function Login(req, res) {}
