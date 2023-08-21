import { useState } from "react";
import axios from "axios";
import ReferralHistoryLoader from "./ReferralHistoryLoader";

export default function ReferralHistory() {
  const [referralHistory, setReferralHistory] = useState([]);
  const [hasMoreReferralHistory, setHasMoreReferralHistory] = useState(true);
  const fetchMorereferralHistory = () => {
    axios
      .get(`/api/referral-history?offset=${referralHistory.length}&limit=15`)
      .then((response) => {
        setReferralHistory((prevReferralHistory) => {
          if (response.data.data.length < 15) setHasMoreReferralHistory(false);
          return prevReferralHistory.concat(response.data.data);
        });
      })
      .catch();
  };
  return (
    <div className="flex flex-col gap-5 rounded-md bg-slate-50 text-[#213458] overflow-hidden w-full max-w-5xl h-full p-3">
      <h2 className="text-xl font-bold">Your referral history:</h2>
      <div className="relative h-full max-h-full overflow-auto flex flex-col justify-start gap-3 px-3 py-3 pb-14 divide-y rounded-md">
        {referralHistory.map((referralRecord, index) => (
          <div key={index} className="flex flex-row gap-2 items-center pt-3">
            <div className="font-bold">
              {`${referralRecord["f_name"]} ${referralRecord["l_name"]} registed to uEarn using your referral link`}
            </div>
            <div className="flex flex-col sm:flex-row ml-auto whitespace-nowrap shrink-0 justify-center gap-2 items-center p-1 px-2 border border-[#213458] rounded-md">
              <p className="text-center">Your reward</p>
              <p className="bg-white p-1 px-3 w-full text-center rounded-md">
                {referralRecord["reward_amount"]}
              </p>
            </div>
          </div>
        ))}
        <ReferralHistoryLoader
          referralHistory={referralHistory}
          fetchMorereferralHistory={fetchMorereferralHistory}
          hasMoreReferralHistory={hasMoreReferralHistory}
        />
      </div>
    </div>
  );
}
