import React from 'react';
import { Link } from "react-router-dom";
import Title from './Title';

function ViewTrensAndNews() {
  return (
    <div className='flex flex-col w-4/5  mb-20 '>
      <div className='w-full flex justify-center mt-20'>
        <Title text1={"Letest Trends"} text2={"& News..."} />
      </div>

      <div className='flex flex-col sm:flex-row '>
        <div className='w-full sm:w-1/2 flex items-center justify-center p-6'>
          <img
            src="\assets\Trends_img.png"
            alt="Mentors"
            className='w-11/12 rounded-full transition-transform transform hover:scale-110'
          />
        </div>
        <div className='w-full sm:w-1/2 flex items-center justify-center p-6'>
          <div>
            <p className='mb-6 text-lg text-gray-500'>
            Stay Ahead with Real-Time Skill Trends & News... Discover what's hot in the tech world with real-time insights into the most in-demand skills.
            </p>
            <Link
              to="/trends"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
            >
              View Trends & News
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewTrensAndNews;