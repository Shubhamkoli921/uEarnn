import { useState } from "react";
import FormInput from "../Components/FormComponents/FormInput";
import axios from "axios";
import {
  validateUsername,
  validatePassword,
} from "../HelperFunctions/formFieldValidationUtils";
import { useNavigate } from "react-router-dom";

function Login (){
  
  const [userName ,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const [userNameError, setUserNameError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);
  const [login, setlogin] = useState(false);
  const navigate = useNavigate()
  const handleSubmit =(e)=>{
    e.preventDefault()
    if(login){
      axios.post("http://localhost:5000/api/login",{userName,password})
      .then((respone)=>{
        console.log(respone)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    else{
      console.log("not login")
    }
    navigate("/dashboard")
    
  }
  

  
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-2">
      <div className="relative w-full sm:max-w-md md:max-w-lg flex flex-col gap-3 p-3 py-5 bg-slate-50 rounded-md divide-y">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-4">
      <FormInput
                type={"text"}
                name={"UserName"}
                placeholder={"Username..."}
                value={userName}
                onChange={(e)=>{setUserName(e.target.value)
                  setUserNameError(validateUsername(e.target.value));
                }}
                error={userNameError}
                
              ></FormInput>
              <FormInput
                type={"password"}
                name={"Password"}
                placeholder={"Password..."}
                onChange={(e)=>{setPassword(e.target.value)
                  setPasswordError(validatePassword(e.target.value));
                }}
                value={password}
                error={passwordError}
              ></FormInput>
              <button onClick={()=>{
                setlogin(true)
              }} className="btn btn-success w-100 rounded-0">
                Login
              </button>
      </form>
      </div>
    </div>
  )
}

export default Login;