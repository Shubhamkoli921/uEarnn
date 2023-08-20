import { Link } from "react-router-dom";
// import BannerImg from "../../assets/react.svg"
// import "./banner.css";
const Banner = () => {
  return (
    <div className="flex flex-col justify-center gap-5 items-center h-full bg-gradient-to-bl from-[#1D7D81] to-white px-3">
      <div className="text-5xl sm:text-6xl font-bold text-[#213458] text-center">
        uEarn,
        <br />
        The best platform to earn{" "}
        <span className="text-slate-50">through referrals</span>
      </div>
      <p className="text-center text-lg px-4 text-[#213458]">
        Invite people to register on uEarn using referral link and earn uEarn
        coins on each successful registration.
      </p>
      <div className="font-bold text-[#213458]">
        Start Earning Your uEarn Coins Now!
      </div>
      <Link
        className="py-2 px-6 bg-[#213458] text-slate-50 text-lg flex items-center justify-center rounded-full"
        to={"/signup"}
      >
        Signup
      </Link>
    </div>
    // <div className="hero-banner shrink-0 h-full">
    //   <div className="content">
    //     <div className="text-content">
    //       <h1>
    //         uEarn, Best Referral Software For{" "}
    //         <span>Social media & Website</span>
    //       </h1>
    //       <p>
    //         InviteReferrals is a powerful and yet simple to integrate referral
    //         software that helps to grow your business and acquire new customers
    //         through Referral Marketing
    //       </p>
    //       <div className="highlight">Start Earning Your Coin Now!</div>
    //     </div>
    //     <div className="button">
    //       <h2>
    //         <Link to="https://google.com">Read More</Link>
    //       </h2>
    //     </div>
    //   </div>
    //   {/* <img className="banner-img" src={BannerImg}/> */}
    // </div>
  );
};
export default Banner;
