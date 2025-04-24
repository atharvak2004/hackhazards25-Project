import React from "react";
import { Link } from "react-router-dom";
import Title from '../components/Title'
import ConnectWithUs from '../components/ConnectWithUs'
import ViewMentors from "../components/ViewMentors";
import BookASession from "../components/BookASession";
import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import AsktheAI from "../components/AsktheAI";
import HeroSpline from "../components/HeroSpline";
import JoinTheCirlce from "../components/JoinTheCirlce";
import ViewTrensAndNews from "../components/ViewTrensAndNews";
import VideoSpline from "../components/VideoSpline";
import AISearchSection from "../components/AISearchSection";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <VideoSpline />
      <div className="min-h-screen bg-gradient-to-b from-[#0c081c] to-[#1a073e] flex flex-col justify-center items-center text-center ">
        <WhyChooseUs />
        <ViewMentors />
        <AsktheAI />  
        <ViewTrensAndNews />
        <AISearchSection />
        <JoinTheCirlce />
        <ConnectWithUs />
   
    </div>
    </>
  );
}

export default Home;
