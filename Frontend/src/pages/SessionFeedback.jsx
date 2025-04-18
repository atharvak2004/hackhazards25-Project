import React from 'react'
import AIQueryBox from '../components/AIQueryBox'
import Title from '../components/Title';
function SessionFeedback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c081c] to-[#1a073e] flex flex-col  items-center text-center p-6">
      <div className='flex p-5 items-center mt-32'>
      <Title text1={"AI"} text2={"Mentor"} />
      </div>
      <p className='text-md text-gray-600'>Got questions? Ask the AI! Get instant answers, learning tips, and guidance anytime </p>
      <p className='text-lg mb-3 text-white font-bold'>It's like having a mentor on demand.</p>
      <AIQueryBox />
    </div>
  )
}

export default SessionFeedback;