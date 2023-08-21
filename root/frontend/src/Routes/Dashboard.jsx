import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createReferralLink } from "../HelperFunctions/createReferralLink";
import copyContentsFromElement from "../HelperFunctions/copyCOntentsFromElement";
import ReferralHistory from "../Components/Dashboard/ReferralHistory";

export default function Dashboard() {
  const [userId, setUserId] = useState(null);
  const [userFirstName, setUserFirstName] = useState(null);
  const [uEarnCoins, setuEarnCoins] = useState(null);
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const [logoutButtonChild, setLogoutButtonChild] = useState("Log out");

  const [settingsOverlayStatus, setSettingsOverlayStatus] = useState("closed");
  const toggleSettingsOverlay = (e) => {
    e.stopPropagation();
    setSettingsOverlayStatus((prevSettingsStatus) =>
      prevSettingsStatus === "opened" ? "closed" : "opened"
    );
  };

  const referralLinkElementRef = useRef(null);

  const navigate = useRef(useNavigate());

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  //case if user is not logged in
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
          setUserLoginStatus(false);
        });
    }
    if (userLoginStatus === "loggedoff") navigate.current("/login");
  }, [userLoginStatus, setUserLoginStatus]);
  useEffect(() => {
    if (userLoginStatus === "loggedin") {
      axios
        .get("/api/user-info?query=f_name,uearn_coins")
        .then((response) => {
          setUserId(response.data.data["_id"]);
          setUserFirstName(response.data.data["f_name"]);
          setuEarnCoins(response.data.data["uearn_coins"]);
          document.title = `${response.data.data["f_name"]}'s dashboard`;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userLoginStatus]);

  const logoutUser = (e) => {
    setLogoutButtonChild(
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
      .get("/api/logout")
      .then((response) => {
        navigate.current("/login");
      })
      .catch((error) => {
        setLogoutButtonChild("Log out");
        console.log(error);
      });
  };
  return (
    <div className="w-screen h-screen max-h-screen overflow-hidden flex flex-col justify-stretch items-center">
      <div className="w-full bg-slate-50 shrink-0 flex flex-row gap-3 items-center px-3 py-2">
        <Link to={"/"} className="mr-auto h-10 p-1">
          <svg
            fill="#000000"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="100%"
            height="100%"
            viewBox="0 0 46.484 46.484"
            xmlSpace="preserve"
          >
            <g>
              <g>
                <path
                  d="M3.749,37.402c0.79,0.392,1.636,0.59,2.513,0.59c2.169,0,4.113-1.205,5.076-3.146c1.156-2.33,0.548-5.076-1.302-6.732
			l12.508-16.937c0.423,0.1,0.857,0.151,1.3,0.151c1.555,0,2.988-0.628,4.034-1.696l7.713,5.886
			c-0.164,0.235-0.315,0.481-0.446,0.744c-1.188,2.392-0.515,5.225,1.453,6.864l-3.841,12.106c-0.284-0.045-0.571-0.074-0.863-0.074
			c-2.168,0-4.112,1.205-5.075,3.146c-1.388,2.799-0.24,6.202,2.557,7.59c0.789,0.391,1.636,0.59,2.513,0.59
			c2.169,0,4.112-1.205,5.076-3.146c1.187-2.393,0.515-5.225-1.453-6.864l3.841-12.106c0.284,0.045,0.571,0.074,0.864,0.074
			c2.167,0,4.112-1.205,5.075-3.146c1.388-2.796,0.24-6.201-2.557-7.589c-0.791-0.392-1.637-0.591-2.514-0.591
			c-0.787,0-1.542,0.163-2.232,0.458L29.35,6.981c0.6-2.508-0.58-5.195-2.986-6.39C25.572,0.199,24.727,0,23.85,0
			c-2.168,0-4.112,1.206-5.076,3.147c-1.117,2.252-0.589,4.897,1.12,6.567L7.299,26.768c-0.338-0.062-0.681-0.104-1.03-0.104
			c-2.168,0-4.112,1.207-5.075,3.148C-0.195,32.609,0.952,36.014,3.749,37.402z M34.275,42.006c-0.453,0.913-1.369,1.48-2.39,1.48
			c-0.41,0-0.808-0.094-1.181-0.278c-1.314-0.652-1.854-2.253-1.2-3.569c0.452-0.912,1.366-1.48,2.388-1.48
			c0.411,0,0.809,0.095,1.18,0.279C34.388,39.089,34.928,40.689,34.275,42.006z M41.4,16.394c1.314,0.653,1.854,2.254,1.202,3.568
			c-0.452,0.913-1.368,1.48-2.389,1.48c-0.411,0-0.81-0.094-1.181-0.278c-1.315-0.652-1.854-2.253-1.203-3.568
			c0.453-0.913,1.369-1.48,2.39-1.48C40.632,16.115,41.027,16.209,41.4,16.394z M21.461,4.482c0.453-0.913,1.368-1.48,2.389-1.48
			c0.411,0,0.809,0.094,1.18,0.278c1.315,0.653,1.855,2.254,1.203,3.568c-0.453,0.913-1.367,1.48-2.389,1.48
			c-0.411,0-0.809-0.094-1.181-0.278C21.347,7.398,20.808,5.797,21.461,4.482z M3.881,31.145c0.453-0.912,1.367-1.48,2.388-1.48
			c0.411,0,0.808,0.095,1.18,0.279c1.315,0.651,1.854,2.252,1.202,3.568c-0.636,1.28-2.269,1.846-3.569,1.202
			C3.766,34.062,3.228,32.461,3.881,31.145z"
                />
              </g>
            </g>
          </svg>
        </Link>
        <div className="flex flex-row items-center gap-2 bg-white border border-slate-200 rounded-md p-1">
          <div className="w-8 h-8 p-1">
            <svg
              className="fill-orange-500"
              width="100%"
              height="100%"
              viewBox="0 0 60 60"
              id="Capa_1"
              version="1.1"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path d="M59.989,21c-0.099-1.711-2.134-3.048-6.204-4.068c0.137-0.3,0.214-0.612,0.215-0.936V9h-0.017C53.625,3.172,29.743,3,27,3  S0.375,3.172,0.017,9H0v0.13v0v0l0,6.869c0.005,1.9,2.457,3.387,6.105,4.494c-0.05,0.166-0.08,0.335-0.09,0.507H6v0.13v0v0l0,6.857  C2.07,28.999,0.107,30.317,0.01,32H0v0.13v0v0l0,6.869c0.003,1.323,1.196,2.445,3.148,3.38c-0.074,0.203-0.12,0.41-0.133,0.622H3  v0.13v0v0l0,6.869c0.008,3.326,7.497,5.391,15.818,6.355c0.061,0.012,0.117,0.037,0.182,0.037c0.019,0,0.035-0.01,0.054-0.011  c1.604,0.181,3.234,0.322,4.847,0.423c0.034,0.004,0.064,0.02,0.099,0.02c0.019,0,0.034-0.01,0.052-0.011  C26.1,56.937,28.115,57,30,57c1.885,0,3.9-0.063,5.948-0.188c0.018,0.001,0.034,0.011,0.052,0.011c0.035,0,0.065-0.017,0.099-0.02  c1.613-0.101,3.243-0.241,4.847-0.423C40.965,56.38,40.981,56.39,41,56.39c0.065,0,0.121-0.025,0.182-0.037  c8.321-0.964,15.809-3.03,15.818-6.357V43h-0.016c-0.07-1.226-1.115-2.249-3.179-3.104c0.126-0.289,0.195-0.589,0.195-0.9V32.46  c3.59-1.104,5.995-2.581,6-4.464V21H59.989z M51.892,39.321l-0.341,0.299C51.026,40.083,50.151,40.55,49,41v-4.768  c1.189-0.414,2.201-0.873,3-1.376v4.138C52,39.097,51.962,39.207,51.892,39.321z M29.526,43.968  c-0.146,0.004-0.293,0.006-0.44,0.009c-0.357,0.007-0.723,0.009-1.085,0.012v-4.995c0.275-0.003,0.55-0.007,0.825-0.012  c0.053-0.001,0.106-0.002,0.159-0.003c1.007-0.019,2.014-0.05,3.016-0.096v4.993c-0.214,0.011-0.429,0.021-0.646,0.03  C30.753,43.933,30.145,43.953,29.526,43.968z M25.159,43.982c-0.458-0.008-0.914-0.019-1.367-0.033  c-0.056-0.002-0.112-0.004-0.168-0.006c-0.545-0.018-1.086-0.041-1.623-0.067v-4.992c1.002,0.047,2.009,0.078,3.016,0.096  c0.053,0.001,0.106,0.002,0.158,0.003c0.275,0.005,0.55,0.009,0.825,0.012v4.998c-0.194-0.002-0.388-0.002-0.581-0.005  C25.331,43.986,25.246,43.983,25.159,43.982z M7.097,41.702C7.064,41.692,7.033,41.683,7,41.674v-4.831  c0.934,0.252,1.938,0.482,3,0.691v4.881c-0.918-0.195-1.765-0.4-2.536-0.61C7.342,41.77,7.216,41.737,7.097,41.702z M28.175,49.983  c0.275,0.005,0.55,0.009,0.825,0.012v4.999c-1.382-0.013-2.716-0.053-4-0.116v-4.993c1.002,0.047,2.009,0.078,3.016,0.096  C28.069,49.981,28.122,49.982,28.175,49.983z M31.984,49.98c1.007-0.019,2.014-0.05,3.016-0.096v4.993  c-1.284,0.063-2.618,0.103-4,0.116v-4.999c0.275-0.003,0.55-0.007,0.825-0.012C31.878,49.982,31.931,49.981,31.984,49.98z   M40,49.528v4.966c-0.961,0.101-1.961,0.19-3,0.263v-4.987C38.014,49.704,39.016,49.623,40,49.528z M42,49.312  c1.031-0.124,2.032-0.265,3-0.422v4.91c-0.942,0.166-1.943,0.319-3,0.458V49.312z M47,48.533c1.062-0.209,2.066-0.439,3-0.691v4.831  c-0.891,0.257-1.894,0.506-3,0.741V48.533z M13,48.533v4.881c-1.106-0.235-2.109-0.484-3-0.741v-4.831  C10.934,48.094,11.938,48.325,13,48.533z M15,48.891c0.968,0.157,1.969,0.298,3,0.422v4.946c-1.057-0.139-2.058-0.292-3-0.458  V48.891z M20,49.528c0.984,0.095,1.986,0.176,3,0.243v4.987c-1.039-0.073-2.039-0.162-3-0.263V49.528z M17.519,43.548  c-0.102-0.01-0.203-0.021-0.304-0.031c-0.072-0.007-0.143-0.016-0.215-0.023v-4.965c0.984,0.095,1.986,0.176,3,0.243v4.983  C19.16,43.695,18.33,43.627,17.519,43.548z M15,38.312v4.946c-1.057-0.139-2.058-0.292-3-0.458v-4.91  C12.968,38.047,13.969,38.189,15,38.312z M34.666,43.708c-0.22,0.017-0.442,0.034-0.666,0.05v-4.987  c1.014-0.067,2.016-0.147,3-0.243v4.966c-0.618,0.065-1.25,0.126-1.899,0.179C34.956,43.686,34.811,43.697,34.666,43.708z   M39,43.258v-4.946c1.031-0.124,2.032-0.265,3-0.422v4.91C41.058,42.966,40.057,43.12,39,43.258z M44,37.533  c1.062-0.209,2.066-0.439,3-0.691v4.831c-0.891,0.257-1.894,0.506-3,0.741V37.533z M30.325,32.965  c-0.752-0.019-1.487-0.048-2.209-0.083c-0.039-0.002-0.078-0.004-0.116-0.005v-4.993c1.002,0.047,2.009,0.078,3.016,0.096  c0.053,0.001,0.106,0.002,0.158,0.003c0.275,0.005,0.55,0.009,0.825,0.012v4.993c-0.487-0.005-0.978-0.007-1.453-0.018  C30.473,32.968,30.398,32.967,30.325,32.965z M7,18.674v-4.831c0.934,0.252,1.938,0.482,3,0.691v4.881  c-0.123-0.026-0.25-0.052-0.37-0.078c-0.532-0.117-1.051-0.239-1.547-0.368C7.705,18.872,7.346,18.773,7,18.674z M25.175,15.983  c0.275,0.005,0.55,0.009,0.825,0.012v4.993c-1.346-0.013-2.684-0.048-4-0.114v-4.989c1.002,0.047,2.009,0.078,3.016,0.096  C25.069,15.981,25.122,15.982,25.175,15.983z M28.984,15.98c1.007-0.019,2.014-0.05,3.016-0.096v4.989  c-0.17,0.008-0.333,0.02-0.504,0.028c-0.014,0.001-0.028,0.001-0.043,0.002c-0.671,0.03-1.355,0.052-2.048,0.068  c-0.108,0.003-0.216,0.004-0.324,0.007c-0.356,0.007-0.72,0.008-1.081,0.012v-4.995c0.275-0.003,0.55-0.007,0.825-0.012  C28.878,15.982,28.931,15.981,28.984,15.98z M51.771,16.482l-0.028-0.006l-0.364,0.283C50.851,17.17,50.04,17.586,49,17.988v-4.757  c1.189-0.414,2.201-0.873,3-1.376v4.138C52,16.145,51.92,16.309,51.771,16.482z M39,20.252v-4.94c1.031-0.124,2.032-0.265,3-0.422  v4.902C41.052,19.96,40.054,20.114,39,20.252z M44,19.407v-4.873c1.062-0.209,2.066-0.439,3-0.691v4.82  C46.104,18.924,45.095,19.173,44,19.407z M37,15.528v4.96c-0.966,0.102-1.966,0.191-3,0.265v-4.982  C35.014,15.704,36.016,15.623,37,15.528z M17,20.49v-4.962c0.984,0.095,1.986,0.176,3,0.243v4.978  C18.982,20.676,17.978,20.593,17,20.49z M15,15.312v4.941c-0.198-0.026-0.404-0.047-0.6-0.074c-0.128-0.018-0.25-0.037-0.376-0.055  c-0.578-0.083-1.143-0.172-1.697-0.265C12.216,19.84,12.109,19.82,12,19.801v-4.91C12.968,15.047,13.969,15.189,15,15.312z   M25.752,32.739c-0.135-0.01-0.271-0.02-0.405-0.03c-0.64-0.05-1.265-0.105-1.875-0.166c-0.131-0.013-0.262-0.027-0.392-0.04  C23.053,32.5,23.027,32.496,23,32.494v-4.966c0.984,0.095,1.986,0.176,3,0.243v4.984C25.919,32.749,25.833,32.745,25.752,32.739z   M19.145,31.992c-0.396-0.063-0.768-0.131-1.145-0.197v-4.904c0.968,0.157,1.969,0.298,3,0.422v4.946  c-0.612-0.081-1.211-0.165-1.786-0.255C19.191,31.999,19.168,31.995,19.145,31.992z M16,26.533v4.873  c-1.105-0.237-2.107-0.489-3-0.751v-4.813C13.934,26.094,14.938,26.325,16,26.533z M11,25.231v4.751  c-1.572-0.607-2.586-1.227-2.916-1.779l-0.067-0.112C8.011,28.06,8.001,28.027,8,27.996l0-4.141  C8.799,24.358,9.811,24.817,11,25.231z M34.984,27.98c1.007-0.019,2.014-0.05,3.016-0.096v4.988c-1.314,0.065-2.65,0.101-4,0.115  v-4.992c0.275-0.003,0.55-0.007,0.825-0.012C34.878,27.982,34.931,27.981,34.984,27.98z M47.907,31.817  c-0.439,0.076-0.882,0.151-1.337,0.22c-0.261,0.04-0.528,0.078-0.796,0.116c-0.253,0.036-0.516,0.067-0.773,0.1v-4.941  c1.031-0.124,2.032-0.265,3-0.422v4.91C47.969,31.806,47.938,31.812,47.907,31.817z M41.136,32.671  c-0.373,0.031-0.758,0.051-1.136,0.078v-4.978c1.014-0.067,2.016-0.147,3-0.243v4.961c-0.581,0.061-1.161,0.122-1.758,0.172  C41.206,32.664,41.172,32.668,41.136,32.671z M52.564,30.796c-0.498,0.139-1.025,0.269-1.563,0.396  c-0.249,0.058-0.503,0.116-0.763,0.172c-0.077,0.017-0.159,0.032-0.237,0.049v-4.879c1.062-0.209,2.066-0.439,3-0.691v4.831  C52.857,30.714,52.712,30.755,52.564,30.796z M57.989,21.065c-0.092,0.679-1.631,1.582-4.378,2.431l0,0  c-3.538,1.093-9.074,2.094-16.09,2.404c-0.359,0.015-0.717,0.03-1.083,0.042c-0.299,0.01-0.599,0.019-0.904,0.027  C34.706,25.987,33.866,26,33,26s-1.706-0.013-2.534-0.032c-0.304-0.007-0.604-0.017-0.904-0.027  c-0.367-0.011-0.725-0.027-1.083-0.042c-7.016-0.31-12.553-1.311-16.09-2.404l0,0c-2.725-0.842-4.261-1.738-4.375-2.414  c0.005-0.019,0.005-0.035,0.017-0.059c0.068,0.017,0.144,0.031,0.213,0.048c0.391,0.093,0.792,0.183,1.2,0.269  c1.987,0.428,4.189,0.779,6.535,1.047c0.008,0,0.014,0.004,0.021,0.004c0.002,0,0.004-0.001,0.005-0.001  c1.598,0.182,3.256,0.325,4.958,0.426c0.013,0,0.024,0.007,0.037,0.007c0.007,0,0.012-0.004,0.019-0.004  c1.225,0.072,2.466,0.125,3.722,0.153C25.51,22.99,26.265,23,27,23c0.525,0,1.063-0.006,1.606-0.016  c7.266-0.112,14-0.976,18.686-2.315c0.216-0.061,0.427-0.124,0.635-0.187c0.127-0.039,0.257-0.077,0.38-0.116  c0.362-0.116,0.709-0.235,1.044-0.359c0.058-0.022,0.113-0.044,0.171-0.066c0.283-0.107,0.555-0.218,0.815-0.331  c0.075-0.033,0.152-0.065,0.225-0.098c0.277-0.125,0.545-0.253,0.793-0.386c0.112-0.059,0.209-0.12,0.314-0.18  c0.12-0.069,0.24-0.139,0.351-0.21c0.063-0.04,0.138-0.078,0.198-0.118C56.695,19.589,57.875,20.651,57.989,21.065z M27,5  c16.489,0,24.829,2.596,24.985,4.086c-0.121,0.676-1.656,1.569-4.374,2.409l0,0c-3.538,1.093-9.074,2.094-16.09,2.404  c-0.359,0.015-0.717,0.03-1.083,0.042c-0.299,0.01-0.599,0.019-0.904,0.027C28.706,13.987,27.866,14,27,14s-1.706-0.013-2.534-0.032  c-0.304-0.007-0.604-0.017-0.904-0.027c-0.367-0.011-0.725-0.027-1.083-0.042c-7.016-0.31-12.553-1.311-16.09-2.404l0,0  c-2.719-0.84-4.253-1.733-4.374-2.409C2.171,7.596,10.511,5,27,5z M2,15.996l0-4.141c0.799,0.503,1.811,0.962,3,1.376v4.788  C3.055,17.29,2.002,16.559,2,15.996z M6.844,29.835c0.015,0.016,0.038,0.03,0.053,0.046c1.369,1.382,4.204,2.468,7.733,3.278  c0.081,0.019,0.167,0.037,0.249,0.056c0.259,0.058,0.522,0.115,0.788,0.17c3.241,0.69,7.11,1.189,11.325,1.436  c0.003,0,0.005,0.001,0.007,0.001c0.002,0,0.003-0.001,0.004-0.001c1.354,0.079,2.739,0.134,4.153,0.158  C31.782,34.992,32.398,35,33,35c0.69,0,1.398-0.008,2.118-0.025c1.308-0.027,2.597-0.081,3.868-0.155  c0.005,0,0.009,0.003,0.014,0.003c0.009,0,0.016-0.005,0.025-0.005c4.226-0.249,8.191-0.753,11.544-1.478  c-0.726,0.38-1.72,0.773-2.958,1.156l0,0c-3.735,1.154-9.7,2.205-17.281,2.449c-0.225,0.007-0.447,0.015-0.675,0.021  c-0.245,0.006-0.494,0.01-0.743,0.015C28.283,36.991,27.65,37,27,37c-0.866,0-1.706-0.013-2.534-0.032  c-0.304-0.007-0.604-0.017-0.904-0.027c-0.367-0.011-0.725-0.027-1.083-0.042c-7.016-0.31-12.553-1.311-16.09-2.404l0,0  c-2.75-0.85-4.289-1.754-4.378-2.433C2.122,31.686,3.133,30.745,6.844,29.835z M2,38.996l0-4.141c0.799,0.503,1.811,0.962,3,1.376  v4.769l-0.571-0.222L4.417,40.79C2.847,40.139,2.002,39.5,2,38.996z M5,49.996l0-4.141c0.799,0.503,1.811,0.962,3,1.376v4.788  C6.055,51.29,5.002,50.559,5,49.996z M52,52.019v-4.787c1.189-0.414,2.201-0.873,3-1.376v4.138  C54.999,50.557,53.945,51.289,52,52.019z M54.987,43.077c-0.109,0.677-1.645,1.575-4.376,2.419l0,0  c-3.538,1.093-9.074,2.094-16.09,2.404c-0.359,0.015-0.717,0.03-1.083,0.042c-0.299,0.01-0.599,0.019-0.904,0.027  C31.706,47.987,30.866,48,30,48c-0.866,0-1.707-0.013-2.536-0.032c-0.301-0.007-0.598-0.017-0.895-0.027  c-0.369-0.012-0.729-0.027-1.09-0.042c-7.016-0.31-12.552-1.311-16.09-2.404l0,0c-2.645-0.817-4.173-1.685-4.365-2.355  c0.298,0.104,0.607,0.205,0.924,0.304c0.032,0.01,0.064,0.02,0.096,0.029c0.27,0.083,0.546,0.163,0.829,0.241  c0.107,0.03,0.215,0.06,0.324,0.089c0.16,0.043,0.324,0.084,0.488,0.126c3.642,0.933,8.291,1.594,13.31,1.891  c0.002,0,0.003,0.001,0.005,0.001c0.001,0,0.002-0.001,0.003-0.001c1.55,0.092,3.133,0.149,4.733,0.168  C26.162,45.996,26.585,46,27,46c0.551,0,1.115-0.007,1.686-0.017c1.459-0.024,2.899-0.078,4.307-0.162  c0.003,0,0.005,0.002,0.008,0.002c0.005,0,0.008-0.003,0.013-0.003c1.715-0.103,3.375-0.25,4.97-0.433  c0.006,0,0.011,0.003,0.017,0.003c0.022,0,0.04-0.011,0.062-0.013c1.776-0.205,3.46-0.457,5.023-0.75  c0.322-0.059,0.639-0.12,0.953-0.183c0.07-0.014,0.14-0.028,0.21-0.043c2.953-0.606,5.509-1.391,7.263-2.364  c0.096-0.052,0.186-0.106,0.277-0.159c0.111-0.066,0.217-0.133,0.32-0.201c0.096-0.062,0.207-0.122,0.295-0.185  C54.378,42.196,54.922,42.826,54.987,43.077z M55,30.019v-4.787c1.189-0.414,2.201-0.873,3-1.376v4.138  C57.999,28.557,56.945,29.289,55,30.019z" />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
              <g />
            </svg>
          </div>
          <p className="px-3 py-1 rounded-md font-bold bg-slate-50">
            {uEarnCoins}
          </p>
        </div>
        {userFirstName ? (
          <div className="bg-slate-100 p-1 px-2 rounded-md">{`Hello, ${userFirstName}`}</div>
        ) : (
          <div className="bg-slate-200 py-4 px-11 rounded-md animate-pulse"></div>
        )}
        <button
          type="button"
          onClick={toggleSettingsOverlay}
          className="h-10 w-10 p-2 bg-slate-100 rounded-full group hover:p-1 transition-all"
        >
          {settingsOverlayStatus === "opened" ? (
            <svg
              width="100%"
              className="p-1"
              height="100%"
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <title>cancel</title>
              <desc>Created with Sketch.</desc>
              <g
                id="icons"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="ui-gambling-website-lined-icnos-casinoshunter"
                  transform="translate(-2168.000000, -158.000000)"
                  fill="#1C1C1F"
                  fillRule="nonzero"
                >
                  <g id="1" transform="translate(1350.000000, 120.000000)">
                    <path
                      d="M821.426657,38.5856848 L830.000001,47.1592624 L838.573343,38.5856848 C839.288374,37.8706535 840.421422,37.8040611 841.267835,38.4653242 L841.414315,38.5987208 C842.195228,39.3796338 842.195228,40.645744 841.414306,41.4266667 L832.840738,50 L841.414315,58.5733429 C842.129347,59.2883742 842.195939,60.4214224 841.534676,61.2678347 L841.401279,61.4143152 C840.620366,62.1952283 839.354256,62.1952283 838.573333,61.4143055 L830.000001,52.8407376 L821.426657,61.4143152 C820.711626,62.1293465 819.578578,62.1959389 818.732165,61.5346758 L818.585685,61.4012792 C817.804772,60.6203662 817.804772,59.354256 818.585694,58.5733333 L827.159262,50 L818.585685,41.4266571 C817.870653,40.7116258 817.804061,39.5785776 818.465324,38.7321653 L818.598721,38.5856848 C819.379634,37.8047717 820.645744,37.8047717 821.426657,38.5856848 Z M820.028674,60.999873 C820.023346,60.9999577 820.018018,61 820.012689,61 Z M820.161408,60.9889406 L820.117602,60.9945129 L820.117602,60.9945129 C820.132128,60.9929912 820.146788,60.9911282 820.161408,60.9889406 Z M819.865274,60.9891349 L819.883098,60.9916147 C819.877051,60.9908286 819.87101,60.9899872 819.864975,60.9890905 L819.865274,60.9891349 Z M819.739652,60.9621771 L819.755271,60.9664589 C819.749879,60.9650278 819.744498,60.9635509 819.739126,60.9620283 L819.739652,60.9621771 Z M820.288411,60.9614133 L820.234515,60.9752112 L820.234515,60.9752112 C820.252527,60.971132 820.270527,60.9665268 820.288411,60.9614133 Z M820.401572,60.921544 L820.359957,60.9380009 L820.359957,60.9380009 C820.373809,60.9328834 820.387743,60.9273763 820.401572,60.921544 Z M819.623655,60.9214803 C819.628579,60.923546 819.626191,60.9225499 819.623806,60.921544 L819.623655,60.9214803 Z M819.506361,60.8625673 L819.400002,60.7903682 C819.444408,60.8248958 819.491056,60.8551582 819.539393,60.8811554 L819.506361,60.8625673 L819.506361,60.8625673 Z M820.51858,60.8628242 L820.486378,60.8809439 L820.486378,60.8809439 C820.496939,60.8752641 820.507806,60.8691536 820.51858,60.8628242 Z M840.881155,60.4606074 L840.862567,60.4936392 L840.862567,60.4936392 L840.790368,60.5999978 C840.824896,60.555592 840.855158,60.5089438 840.881155,60.4606074 Z M840.936494,60.3386283 L840.92148,60.3763453 L840.92148,60.3763453 C840.926791,60.3637541 840.931774,60.3512293 840.936494,60.3386283 Z M840.974777,60.2110466 L840.962177,60.2603479 L840.962177,60.2603479 C840.966711,60.2443555 840.97096,60.2277405 840.974777,60.2110466 Z M840.994445,60.0928727 L840.989135,60.1347261 L840.989135,60.1347261 C840.991174,60.1210064 840.992958,60.1069523 840.994445,60.0928727 Z M839.987311,39.9996529 L830,49.9872374 L820.012689,39.9996529 L819.999653,40.0126889 L829.987237,50 L819.999653,59.9873111 L820.012689,60.0003471 L830,50.0127626 L839.987311,60.0003471 L840.000347,59.9873111 L830.012763,50 L840.000347,40.0126889 L839.987311,39.9996529 Z M840.999873,59.9713258 L840.999916,60.0003193 L840.999916,60.0003193 C841.000041,59.9907089 841.000027,59.9810165 840.999873,59.9713258 Z M840.988941,59.8385918 L840.994513,59.8823981 L840.994513,59.8823981 C840.992991,59.8678719 840.991128,59.8532122 840.988941,59.8385918 Z M840.961413,59.7115886 L840.975211,59.7654853 L840.975211,59.7654853 C840.971132,59.7474727 840.966527,59.7294733 840.961413,59.7115886 Z M840.921544,59.5984278 L840.938001,59.6400431 L840.938001,59.6400431 C840.932883,59.6261908 840.927376,59.612257 840.921544,59.5984278 Z M840.862824,59.4814199 L840.880944,59.5136217 L840.880944,59.5136217 C840.875264,59.503061 840.869154,59.4921939 840.862824,59.4814199 Z M819.119056,40.4863783 L819.134164,40.5134185 C819.128903,40.5043379 819.123796,40.4951922 819.118845,40.4859852 L819.119056,40.4863783 Z M819.061999,40.3599569 L819.075467,40.3944079 C819.070734,40.3829341 819.066223,40.3713901 819.061935,40.3597825 L819.061999,40.3599569 Z M819.024789,40.2345147 L819.033541,40.2701072 C819.030397,40.2582611 819.027473,40.2463686 819.024771,40.234436 L819.024789,40.2345147 Z M819.005077,40.1136164 L819.008385,40.1422797 C819.007138,40.1326872 819.00603,40.12308 819.005061,40.1134615 L819.005077,40.1136164 Z M819.000419,39.9836733 L819,40.0126889 C819,40.002956 819.000141,39.993223 819.000424,39.9834934 L819.000419,39.9836733 Z M819.010865,39.8652739 L819.008385,39.8830981 C819.009171,39.8770511 819.010013,39.8710099 819.010909,39.8649753 L819.010865,39.8652739 Z M819.037823,39.7396521 L819.033541,39.7552707 C819.034972,39.7498794 819.036449,39.7444978 819.037972,39.7391264 L819.037823,39.7396521 Z M819.07852,39.6236547 C819.076454,39.6285788 819.07745,39.6261907 819.078456,39.6238057 L819.07852,39.6236547 Z M819.137433,39.5063608 L819.209632,39.4000022 C819.175104,39.444408 819.144842,39.4910562 819.118845,39.5393926 L819.137433,39.5063608 L819.137433,39.5063608 Z M820.485985,39.1188446 L820.519017,39.1374327 L820.519017,39.1374327 L820.625376,39.2096318 C820.58097,39.1751042 820.534322,39.1448418 820.485985,39.1188446 Z M839.513622,39.1190561 L839.486582,39.1341644 C839.495662,39.128903 839.504808,39.1237964 839.514015,39.1188446 L839.513622,39.1190561 Z M819.539,39.1190561 L819.511959,39.1341644 C819.52104,39.128903 819.530186,39.1237964 819.539393,39.1188446 L819.539,39.1190561 Z M840.460607,39.1188446 L840.493639,39.1374327 L840.493639,39.1374327 L840.599998,39.2096318 C840.555592,39.1751042 840.508944,39.1448418 840.460607,39.1188446 Z M819.661418,39.0634885 L819.63097,39.0754675 C819.641051,39.0713084 819.651187,39.0673212 819.661372,39.0635059 L819.661418,39.0634885 Z M820.359783,39.0619346 L820.401723,39.0785197 L820.401723,39.0785197 C820.387743,39.0726237 820.373809,39.0671166 820.359783,39.0619346 Z M839.640043,39.0619991 L839.605592,39.0754675 C839.617066,39.0707338 839.62861,39.0662229 839.640217,39.0619346 L839.640043,39.0619991 Z M840.338628,39.0635059 L840.376345,39.0785197 L840.376345,39.0785197 C840.363754,39.0732095 840.351229,39.0682261 840.338628,39.0635059 Z M819.789259,39.0251536 L819.755271,39.0335411 C819.766459,39.0305713 819.777688,39.0277987 819.788953,39.0252234 L819.789259,39.0251536 Z M820.234436,39.0247709 L820.288548,39.0386257 L820.288548,39.0386257 C820.270527,39.0334732 820.252527,39.028868 820.234436,39.0247709 Z M839.765485,39.0247888 L839.729893,39.0335411 C839.741739,39.0303966 839.753631,39.0274732 839.765564,39.0247709 L839.765485,39.0247888 Z M840.211047,39.0252234 L840.260348,39.0378229 L840.260348,39.0378229 C840.244356,39.0332892 840.227741,39.0290398 840.211047,39.0252234 Z M819.911404,39.0051132 L819.883098,39.0083853 C819.892432,39.0071719 819.901779,39.0060902 819.911137,39.0051402 L819.911404,39.0051132 Z M820.113462,39.0050614 L820.161342,39.0110494 L820.161342,39.0110494 C820.145468,39.0086743 820.12948,39.006675 820.113462,39.0050614 Z M839.886384,39.005077 L839.85772,39.0083853 C839.867313,39.0071382 839.87692,39.0060303 839.886538,39.0050614 L839.886384,39.005077 Z M840.088863,39.0051402 L840.134726,39.0108651 L840.134726,39.0108651 C840.119676,39.0086288 840.104284,39.0067057 840.088863,39.0051402 Z M839.95834,39.0004173 L840.016507,39.0004238 C839.997122,38.9998609 839.977725,38.9998588 839.95834,39.0004173 Z M819.983493,39.0004238 L820.04166,39.0004173 C820.022275,38.9998588 820.002878,38.9998609 819.983493,39.0004238 Z"
                      id="cancel"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          ) : (
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke="#000000"
                className="group-hover:stroke-[#213458]"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                stroke="#000000"
                className="group-hover:stroke-[#213458]"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="relative h-full w-full flex flex-col gap-5 pt-5 px-2 items-center">
        {settingsOverlayStatus === "opened" && (
          <div
            onClick={toggleSettingsOverlay}
            className="absolute top-0 left-0 h-full bg-slate-500/40 z-10 flex justify-end w-full"
          >
            <div
              className="relative h-full w-72 bg-white flex flex-col gap-3 p-2"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <button
                type="button"
                onClick={logoutUser}
                className="mt-auto border border-[#213458] text-[#213458] hover:bg-[#213458] hover:text-white rounded-md h-10 py-1 px-3"
              >
                {logoutButtonChild}
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col rounded-md bg-slate-50 text-[#213458] overflow-hidden w-full max-w-5xl shrink-0">
          <div className="text-lg font-bold p-3 text-center">
            Copy the referal link and share it in your network, upon each
            successfull registration through your referal link, you will be
            rewarded with 100 uEarn coins.
          </div>
          {userId ? (
            <div className="w-full flex flex-row gap-2 items-center px-3 py-2 bg-slate-100">
              <p
                ref={referralLinkElementRef}
                className="mr-auto border w-full px-3 py-1 rounded-md bg-white whitespace-nowrap overflow-x-clip"
              >
                {createReferralLink(userId)}
              </p>
              <button
                className="px-3 py-1 shrink-0 bg-[#213458] text-white rounded-md"
                type="button"
                onClick={() => {
                  copyContentsFromElement(
                    referralLinkElementRef.current,
                    () => {
                      setCopyButtonText("Copied!");
                      setTimeout(() => {
                        setCopyButtonText("Copy");
                      }, 2000);
                    }
                  );
                }}
              >
                {copyButtonText}
              </button>
            </div>
          ) : (
            <div className="bg-slate-200 py-5 w-full animate-pulse"></div>
          )}
        </div>
        <ReferralHistory />
      </div>
    </div>
  );
}
