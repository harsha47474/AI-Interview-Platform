import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeHero from "../components/home/HomeHero";
import HomeSteps from "../components/home/HomeSteps";
import HomeCapabilities from "../components/home/HomeCapabilities";

/**
 * Home - Landing page for Colloquium AI interview preparation platform
 */
const Home = () => {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <Navbar />

      {/* Hero presentation & quick action buttons */}
      <HomeHero userName={userData?.name} />

      {/* 3-Step Guided Process */}
      <HomeSteps />

      {/* Advanced AI Capabilities showcase */}
      <HomeCapabilities />

      <Footer />
    </div>
  );
};

export default Home;
