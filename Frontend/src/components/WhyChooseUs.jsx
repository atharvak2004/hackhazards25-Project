import React from 'react';
import Title from './Title';

function WhyChooseUs() {
  return (
    <>
      <div className='flex justify-center'>
        <Title text1={"Why Choose"} text2={"Us!"} />
      </div>

      <div className='flex flex-col p-5 mt-5 w-11/12 sm:w-8/12 mx-auto'>

        <div className='text-blue-700 text-left p-5 border border-gray-400 mb-5 rounded-lg transition-transform transform hover:scale-110'>
          <h2 className='text-2xl'>Why Our Platform...?</h2>
          <p className='text-lg text-gray-500'>We connect students with vetted mentors for real-world learning and growth.</p>
        </div>

        <div className='text-blue-700 text-right p-5 border border-gray-400 mb-5 rounded-lg transition-transform transform hover:scale-110'>
          <h2 className='text-2xl'>Built for Growth...</h2>
          <p className='text-lg text-gray-500'>More than lessons—build relationships that shape your career.</p>
        </div>

        <div className='text-blue-700 text-left p-5 border border-gray-400 mb-5 rounded-lg transition-transform transform hover:scale-110'>
          <h2 className='text-2xl'>Learning, Evolved...</h2>
          <p className='text-lg text-gray-500'>Designed for learners. Backed by experts. Powered by purpose.</p>
        </div>

        <div className='text-blue-700 text-right p-5 border border-gray-400 mb-5 rounded-lg transition-transform transform hover:scale-110'>
          <h2 className='text-2xl'>Empowering Connections...</h2>
          <p className='text-lg text-gray-500'>From coding to career advice, get guidance tailored to your journey.</p>
        </div>

      </div>
    </>
  );
}

export default WhyChooseUs;
