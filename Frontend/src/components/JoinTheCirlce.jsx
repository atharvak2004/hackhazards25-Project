import React from 'react';
import Title from './Title';
import { Link } from "react-router-dom";

function JoinTheCirlce() {
  return (
    <div className='p-5 w-10/12 mt-20'>
      <div className='w-full flex justify-center'>
        <Title text1={"Join Circle &"} text2={"Learn Together"} />
      </div>
      <div className='flex flex-col sm:flex-row mt-2 items-center'>
        <div className='flex-1 text-left p-4'>
          <p className='mt-3 mb-10 text-lg text-gray-500'>
          Join the Circle. Learn Together... Circles are your private learning squads or public discussion spaces where students and mentors collaborate, share knowledge, and grow together.
          </p>
          <Link
            to="/circles"
            className="mt-3 inline-block px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
          >
            View Circles
          </Link>
        </div>
        <div className='flex-1 p-4 flex justify-center'>
          <img
            src="\assets\Circle_img.png"
            alt="joinCirlce"
            className='rounded-full w-11/12 lg:w-9/12 transition-transform transform hover:scale-110'
          />
        </div>
      </div>
    </div>
  )
}

export default JoinTheCirlce;