import React from 'react';
import { Link } from "react-router-dom";
import Title from './Title';

function AsktheAI() {
  return (
    <div className='p-5 w-10/12 mt-20'>
      <div className='w-full flex justify-center'>
        <Title text1={"Ask"} text2={"The AI"} />
      </div>
      <div className='flex flex-col sm:flex-row mt-2 items-center'>
        <div className='flex-1 text-left p-4'>
          <p className='mt-3 mb-10 text-lg text-gray-500'>
          Got questions? Ask the AI! Get instant answers, learning tips, and guidance anytime - It's like having a mentor on demand.
          </p>
          <Link
            to="/mentors"
            className="mt-3 inline-block px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
          >
            View Mentors
          </Link>
        </div>
        <div className='flex-1 p-4 flex justify-center'>
          <img
            src="\assets\AskTheAI4.png"
            alt="Ask the AI"
            className='rounded-full w-11/12 lg:w-9/12 transition-transform transform hover:scale-110'
          />
        </div>
      </div>
    </div>
  );
}

export default AsktheAI;
