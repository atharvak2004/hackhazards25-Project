import React from 'react'
import { Link } from "react-router-dom";
import Title from './Title';
function BookASession() {
  return (
    <div>
      <Title text1={"Book a"} text2={"Session"} />
      <h1>Schedule 1-on-1 Time... </h1>
      <p className='mt-4 mb-10'>Found a mentor you vibe with? Book a session in just a few clicks and start your personalized learning journey.</p>
      
    </div>
  )
}

export default BookASession;