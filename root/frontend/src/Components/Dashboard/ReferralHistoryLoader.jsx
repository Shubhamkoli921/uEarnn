import { InView } from "react-intersection-observer";

export default function ReferralHistoryLoader({
  referralHistory,
  fetchMorereferralHistory,
  hasMoreReferralHistory,
}) {
  return hasMoreReferralHistory ? (
    <InView
      as="div"
      className="flex items-center justify-center py-2 h-10"
      onChange={(inView, entry) =>
        inView && hasMoreReferralHistory && fetchMorereferralHistory()
      }
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className="animate-spin"
      >
        <g className="fill-slate-500" fillRule="evenodd" clipRule="evenodd">
          <path
            d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
            opacity=".2"
          />

          <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z" />
        </g>
      </svg>
    </InView>
  ) : !hasMoreReferralHistory && referralHistory.length ? (
    <p className="text-center text-sm">No more referral history</p>
  ) : (
    <p className="text-center">No referral record display</p>
  );
}
