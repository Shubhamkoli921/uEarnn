import { Link } from "react-router-dom";
// import BannerImg from "../../assets/react.svg"
import './banner.css'
const Banner = () => {
    return (
        <div className="hero-banner">
            <div className="content">
                <div className="text-content">
                    <h1>uEarn, Best Referral Software For <span>Social media & Website</span></h1>
                    <p>InviteReferrals is a powerful and yet simple to integrate referral software that helps to grow your business and acquire new customers through Referral Marketing</p>
                <div className="highlight">Start Earning Your Coin Now!</div>
                </div>
                <div className="button">
                    <h2><Link to="https://google.com">Read More</Link></h2>
                </div>
            </div>
            {/* <img className="banner-img" src={BannerImg}/> */}
        </div>
    );
}
export default Banner;