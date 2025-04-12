import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-100 text-black p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">AI Mentor</h1>
        <div className="space-x-5">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/mentors" className="hover:underline">Mentors</Link>
          <Link to="/book" className="hover:underline">Book</Link>
          <Link to="/feedback" className="hover:underline">Feedback</Link>
          <Link to="/trends" className="hover:underline">Trends</Link>
        </div>
        <div className=''>

        </div>
      </div>
    </nav>
  )
}

export default Navbar;