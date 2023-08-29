import { useEffect, useRef, useState } from "react";
import FormInput from "../Components/FormComponents/FormInput";
import axios from "axios";
import {
  validateUsername,
  validatePassword,
} from "../HelperFunctions/formFieldValidationUtils";
import { useNavigate } from "react-router-dom";
import ViewPasswordButton from "../Components/FormComponents/ViewPasswordButton";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFormDataValid, setIsFormDataValid] = useState(false);
  const [loginButtonChild, setLoginButtonChild] = useState("Login");
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const [formError, setFormError] = useState(null);

  const navigate = useRef(useNavigate());

  useEffect(() => {
    document.title = "Login to uEarn";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginButtonChild(
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className="animate-spin"
      >
        <g fill="#fff" fillRule="evenodd" clipRule="evenodd">
          <path
            d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
            opacity=".2"
          />

          <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z" />
        </g>
      </svg>
    );
    axios
      .post(
        "/api/login",
        { u_name: userName, password },
        { withCredentials: true }
      )
      .then((response) => {
        navigate.current("/dashboard");
      })
      .catch((error) => {
        setFormError(error.response.data.error);
        setLoginButtonChild("Login");
      });
  };

  useEffect(() => {
    userNameRef.current?.focus();
  }, []);

  useEffect(() => {
    if (
      userNameError ||
      userNameError === undefined ||
      passwordError ||
      passwordError === undefined
    ) {
      setIsFormDataValid(false);
    } else {
      setIsFormDataValid(true);
    }
  }, [userNameError, passwordError, setIsFormDataValid]);

  useEffect(() => {
    if (formError) setFormError(null);
  }, [userName, password]);

  //case if user is already logged in
  const [userLoginStatus, setUserLoginStatus] = useState(undefined);
  useEffect(() => {
    if (userLoginStatus === undefined) {
      axios
        .get("/api/login-status", { withCredentials: true })
        .then((response) => {
          if (response.data.data === "loggedin") {
            setUserLoginStatus("loggedin");
          } else {
            setUserLoginStatus("loggedoff");
          }
        })
        .catch((error) => {
          setUserLoginStatus(false);
        });
    }
    if (userLoginStatus === "loggedin") navigate.current("/dashboard");
  }, [userLoginStatus, setUserLoginStatus]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-2">
      <div className="relative w-full sm:max-w-md md:max-w-lg flex flex-col gap-3 p-3 py-5 bg-slate-50 rounded-md divide-y">
        <div className="text-2xl text-center px-2 font-bold text-[#213458]">
          Login to uEarn
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-4">
          <FormInput
            type={"text"}
            name={"Username"}
            placeholder={"Username..."}
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setUserNameError(validateUsername(e.target.value));
            }}
            inputTagRef={userNameRef}
          ></FormInput>
          <FormInput
            type={isPasswordVisible ? "text" : "password"}
            name={"Password"}
            placeholder={"Password..."}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(validatePassword(e.target.value));
            }}
            value={password}
            AdjecentElement={
              <ViewPasswordButton
                isPasswordVisible={isPasswordVisible}
                togglePasswordVisibility={() => {
                  setIsPasswordVisible((prev) => !prev);
                  passwordRef.current.focus();
                }}
              />
            }
            inputTagRef={passwordRef}
          ></FormInput>
          <button
            className={`w-full h-12 py-2 rounded-md text-white ${
              isFormDataValid ? "bg-[#213458]" : "bg-slate-500"
            }`}
            type="submit"
            disabled={isFormDataValid ? false : true}
          >
            {loginButtonChild}
          </button>
        </form>
        {formError && (
          <span className="bg-red-50 py-1 px-3 text-sm text-red-500 rounded-md text-center">
            {formError}
          </span>
        )}
      </div>
    </div>
  );
}

export default Login;
