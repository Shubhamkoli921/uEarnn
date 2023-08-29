import { useEffect, useState } from "react";
import axios from "axios";

export default function CheckUserNameExistence({ userName, setUserNameError }) {
  const [userNameExistenceStatus, setUserNameExistenceStatus] =
    useState(undefined);

  useEffect(() => {
    const requestController = new AbortController();
    axios
      .get(`/api/check-username/${userName}`, {
        signal: requestController.signal,
      })
      .then((response) => {
        if (!response.data.data) {
          setUserNameError(null);
        } else {
          setUserNameError("Username already exists!");
        }
        setUserNameExistenceStatus(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      requestController.abort();
    };
  }, [userName, setUserNameError]);
  return (
    <div className="h-10 w-10 p-1 group" type="button">
      {userNameExistenceStatus === undefined ? (
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

            <path
              className="fill-slate-500"
              d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"
            />
          </g>
        </svg>
      ) : (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
            fill="#4CAF50"
          />
          <path
            d="M738.133333 311.466667L448 601.6l-119.466667-119.466667-59.733333 59.733334 179.2 179.2 349.866667-349.866667z"
            fill="#CCFF90"
          />
        </svg>
      )}
    </div>
  );
}
