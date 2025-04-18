import React from 'react';
import { Link } from "react-router-dom";
import Title from './Title';

function Hero() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
      <div className='flex flex-col sm:flex-row border border-gray-400 w-4/5 mb-20 rounded-2xl'>
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
          <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
              <p className='w-8 md:w-11 h-[2px] bg-[#414141] mb-4'></p>
              <p className='font-medium text-sm md:text-base mb-5'>Connect with skilled mentors</p>
            </div>

            <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed bg-gradient-to-r from-lime-400 via-cyan-400 to-blue-500 text-transparent bg-clip-text '>Welcome to AI Mentor</h1>

            <div className='flex items-center gap-2'>
              <p className='font-semibold text-sm md:text-base mt-5'>AI-powered 1-on-1 sessions to boost your learning</p>
              <p className='w-8 md:w-11 h-[1px] bg-[#414141] mt-5'></p>
            </div>
          </div>
        </div>
        <img className='w-full sm:w-1/2 rounded-2xl' src="\assets\hero_img.jpeg" alt="" />
      </div>
  );
}

export default Hero;