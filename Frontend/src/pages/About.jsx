import React from "react";
import Title from "../components/Title";

function About() {
  return (
    <div className="min-h-screen p-6 pt-32 bg-gradient-to-b from-[#0c081c] to-[#1a073e] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <Title text1="About" text2="Us" />

        <p className="mt-6 text-lg text-gray-300 leading-relaxed">
          Skillora.io is a real-time mentorship and collaborative learning platform designed to connect students with expert mentors.
          Our mission is to bridge the gap between curiosity and confidence by providing tools that empower learners to grow with guidance.
        </p>

        <p className="mt-4 text-md text-gray-400">
          Whether you're a student seeking clarity or a mentor looking to make an impact, Skillora offers session bookings, real-time skill trends,
          and dynamic community Circles where knowledge is shared and ideas grow.
        </p>

        <p className="mt-4 text-md text-gray-400">
          Built by <strong>Team EvoCoders</strong> during HackHazards 2025, this platform is more than code—it's a mission to inspire,
          empower, and evolve the future of mentorship and learning.
        </p>
      </div>
    </div>
  );
}

export default About;
