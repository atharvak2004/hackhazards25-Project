import React from 'react';
import Title from '../components/Title';
import SkillTrends from '../components/SkillTrends';

function Trends() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c081c] to-[#1a073e] flex flex-col  items-center text-center p-6">
      <div className='mt-32'>
        <Title text1={"Skill"} text2={"Trends"} />
      </div>
      
      <SkillTrends/>
    </div>
  )
}

export default Trends;