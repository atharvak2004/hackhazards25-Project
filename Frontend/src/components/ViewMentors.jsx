import React from 'react';
import { Link } from "react-router-dom";
import Title from './Title';

function ViewMentors() {
  return (
    <div className='flex flex-col w-4/5  mb-20 '>
      <div className='w-full flex justify-center mt-20'>
        <Title text1={"Meet Our"} text2={"Mentors"} />
      </div>

      <div className='flex flex-col sm:flex-row '>
        <div className='w-full sm:w-1/2 flex items-center justify-center p-6'>
          <img
            src="\assets\Mentors_img4.png"
            alt="Mentors"
            className='w-11/12 rounded-full transition-transform transform hover:scale-110'
          />
        </div>
        <div className='w-full sm:w-1/2 flex items-center justify-center p-6'>
          <div>
            <p className='mb-6 text-lg text-gray-500'>
              Browse profiles of experienced professionals ready to guide you. Filter by skills, industries, and more to find your perfect match.
            </p>
            <Link
              to="/mentors"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
            >
              View Mentors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMentors;
