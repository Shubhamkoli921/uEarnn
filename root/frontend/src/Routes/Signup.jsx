import { useEffect, useRef, useState } from "react";
import FormInput from "../Components/FormComponents/FormInput";
import {
  validateFirstName,
  validateLastName,
  validateUsername,
  validatePassword,
} from "../HelperFunctions/formFieldValidationUtils";
import postSignupForm from "../HelperFunctions/postSignupForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ViewPasswordButton from "../Components/FormComponents/ViewPasswordButton";

function Signup() {
  const [currentSection, setCurrentSection] = useState("userDataForm");

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
  const [paymentStatus, setPaymentStatus] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const firstNameRef = useRef(null);
  const passwordRef = useRef(null);

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

  useEffect(() => {
    if (paymentStatus)
      postSignupForm(
        {
          f_name: firstName,
          l_name: lastName,
          u_name: userName,
          password: password,
        },
        () => {
          navigate("/login");
        },
        setFormError
      );
  }, [paymentStatus, firstName, lastName, userName, password, navigate]);
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
        {currentSection === "userDataForm" ? (
          <div className="flex flex-col gap-4 divide-y">
            {!referrerId && (
              <div className="text-2xl text-center px-2 font-bold text-[#213458]">
                Sign up to uEarn
              </div>
            )}
            <form className="flex flex-col gap-4 pt-4">
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
            </form>
          </div>
        ) : (
          <button
            className="border border-blue-500"
            onClick={() => {
              setPaymentStatus(true);
            }}
          >
            Complete Payment
          </button>
        )}
        <div className="flex flex-row items-center pt-4">
          <div className="w-full flex justify-center items-center">
            {currentSection === "userDataForm" ? null : (
              <button
                className=" w-full py-2 rounded-md bg-[#213458] text-white"
                onClick={() => {
                  setCurrentSection("userDataForm");
                }}
              >
                Prev
              </button>
            )}
          </div>
          <div className="w-full flex justify-center items-center">
            {currentSection === "userDataForm" && isFormDataValid ? (
              <button
                className="w-full py-2 rounded-md bg-[#213458] text-white"
                onClick={() => {
                  setCurrentSection("paymentInterface");
                }}
              >
                Next
              </button>
            ) : null}
          </div>
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
