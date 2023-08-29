import { useEffect, useRef, useState } from "react";
import FormInput from "../Components/FormComponents/FormInput";
import {
  validateFirstName,
  validateLastName,
  validateUsername,
  validatePassword,
} from "../HelperFunctions/formFieldValidationUtils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ViewPasswordButton from "../Components/FormComponents/ViewPasswordButton";
import CheckUserNameExistence from "../Components/FormComponents/CheckUserNameExistence";

function Signup() {
  //form fields state
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(undefined);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(undefined);
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState(undefined);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(undefined);

  const [formError, setFormError] = useState(null);

  const [isFormDataValid, setIsFormDataValid] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const firstNameRef = useRef(null);
  const passwordRef = useRef(null);

  const [signupButtonChild, setSignupButtonChild] = useState("Signup");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Signup to uEarn";
  }, []);

  useEffect(() => {
    firstNameRef.current?.focus();
  }, []);

  //case if user is already logged in
  const [userLoginStatus, setUserLoginStatus] = useState(undefined);
  useEffect(() => {
    if (userLoginStatus === undefined) {
      axios
        .get("/api/login-status")
        .then((response) => {
          if (response.data.data === "loggedin") {
            setUserLoginStatus("loggedin");
          } else {
            setUserLoginStatus("loggedoff");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (userLoginStatus === "loggedin") navigate("/dashboard");
  }, [userLoginStatus, setUserLoginStatus, navigate]);

  useEffect(() => {
    if (
      firstNameError ||
      firstNameError === undefined ||
      lastNameError ||
      lastNameError === undefined ||
      userNameError ||
      userNameError === undefined ||
      passwordError ||
      passwordError === undefined
    ) {
      setIsFormDataValid(false);
    } else {
      setIsFormDataValid(true);
    }
  }, [
    firstNameError,
    lastNameError,
    userNameError,
    passwordError,
    setIsFormDataValid,
  ]);

  function postSignupForm(formData) {
    const referrerId = new URLSearchParams(document.location.search).get(
      "referrer"
    );
    const postUrl = `/api/signup${referrerId ? `?referrer=${referrerId}` : ""}`;

    setSignupButtonChild(
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
      .post(postUrl, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((responseData) => {
        navigate("/login");
      })
      .catch((error) => {
        setFormError(error.response.data.error);
        setSignupButtonChild("Signup");
      });
  }

  const referrerId = new URLSearchParams(document.location.search).get(
    "referrer"
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-2">
      <div className="relative w-full sm:max-w-md md:max-w-lg flex flex-col gap-3 p-3 py-5 bg-slate-50 rounded-md divide-y">
        {referrerId && (
          <div className="text-2xl text-center px-2 font-bold text-[#213458]">
            Sign up, refer and start earning with amazing features of the
            platform.
          </div>
        )}
        <div className="flex flex-col gap-4 divide-y">
          {!referrerId && (
            <div className="text-2xl text-center px-2 font-bold text-[#213458]">
              Sign up to uEarn
            </div>
          )}
          <form
            className="flex flex-col gap-4 pt-4"
            onSubmit={(e) => {
              e.preventDefault();
              postSignupForm({
                f_name: firstName,
                l_name: lastName,
                u_name: userName,
                password: password,
              });
            }}
          >
            <FormInput
              inputTagRef={firstNameRef}
              type={"text"}
              name={"First name"}
              placeholder={"First name..."}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameError(validateFirstName(e.target.value));
              }}
              error={firstNameError}
            ></FormInput>
            <FormInput
              type={"text"}
              name={"Last name"}
              placeholder={"Last name..."}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameError(validateLastName(e.target.value));
              }}
              error={lastNameError}
            ></FormInput>
            <FormInput
              type={"text"}
              name={"UserName"}
              placeholder={"Username..."}
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setUserNameError(validateUsername(e.target.value));
              }}
              error={userNameError}
              AdjecentElement={
                !userNameError && userNameError !== undefined ? (
                  <CheckUserNameExistence
                    userName={userName}
                    setUserNameError={setUserNameError}
                  />
                ) : null
              }
            ></FormInput>
            <FormInput
              type={isPasswordVisible ? "text" : "password"}
              name={"Password"}
              placeholder={"Password..."}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(validatePassword(e.target.value));
              }}
              error={passwordError}
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
            <div className="w-full flex justify-center items-center">
              <button
                type="submit"
                className="w-full h-10 py-2 rounded-md bg-[#213458] disabled:bg-slate-500 text-white"
                disabled={isFormDataValid ? false : true}
              >
                {signupButtonChild}
              </button>
            </div>
          </form>
        </div>

        {formError && (
          <span className="bg-red-50 py-1 px-3 text-sm text-red-500 rounded-md">
            {formError}
          </span>
        )}
      </div>
    </div>
  );
}

export default Signup;
