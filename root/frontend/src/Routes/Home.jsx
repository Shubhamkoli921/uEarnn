import { useEffect } from "react";
import Banner from "../Components/header&banner/banner";
import Header from "../Components/header&banner/header";

function Home() {
  useEffect(() => {
    document.title =
      "uEarn : An innovative online platform that leverages the power of referrals to create a dynamic earning opportunity for users";
  });
  return (
    <div className="h-screen flex flex-col justify-stretch">
      <Header />
      <Banner />
    </div>
  );
}

export default Home;
