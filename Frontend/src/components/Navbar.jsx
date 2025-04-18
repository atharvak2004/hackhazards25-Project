import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useState } from 'react';

function Navbar() {
  const [visible, setVisble] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transpernet backdrop-blur-none p-4 ">
      <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/" className='text-xl font-bold pl-6 text-white'>AI Mentor</Link>

        <div className="hidden sm:flex gap-5 text-sm text-gray-700">
          <Link to="/" className='flex flex-col items-center gap-1'>
            <p className="text-gray-400 hover:underline hover:text-white">HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </Link>
          <Link to="/mentors" className='flex flex-col items-center gap-1'>
            <p className="text-gray-400 hover:underline hover:text-white">MENTORS</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </Link>

          {/*Only show for students */}
          {user?.role === "student" && (
            <Link to="/book" className='flex flex-col items-center gap-1'>
              <p className="text-gray-400 hover:underline hover:text-white">BOOK</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </Link>
          )}
          <Link to="/feedback" className='flex flex-col items-center gap-1'>
            <p className="text-gray-400 hover:underline hover:text-white">AI MENTOR</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </Link>
          <Link to="/trends" className='flex flex-col items-center gap-1'>
            <p className="text-gray-400 hover:underline hover:text-white">TRENDS</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
          </Link>


          {token &&
            <Link to="/my-sessions" className='flex flex-col items-center gap-1'>
              <p className="text-gray-400 hover:underline hover:text-white">MY SESSIONS</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </Link>
          }

          {/*Only show for mentors */}
          {user?.role === "mentor" && (
            <Link to="/mentor-profile" className='flex flex-col items-center gap-1'>
              <p className="text-gray-400 hover:underline hover:text-white">MY PROFILE</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </Link>
          )}
        </div>

        <div className="flex flex-row space-x-3 p-3">
          {token ? (
            <>

              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Signup</Link>
              
            </>
          )}
          
          <img onClick={() => setVisble(true)} className='w-5 cursor-pointer sm:hidden' src="/assets/menu.png" alt="menu" />
        </div>
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`} >
          <div className='flex flex-col text-gray-600'>
            <div onClick={() => setVisble(false)} className='flex items-center gap-4 p-3 '>
              <img className='h-4 rotate-180' src='/assets/back.png' alt="back" />
              <p>Back</p>
            </div>
            <Link onClick={() => setVisble(false)} to="/" className='py-2 pl-6 border'>HOME</Link>
            <Link onClick={() => setVisble(false)} to='/mentors' className='py-2 pl-6 border'>MENTORS</Link>
            {user?.role === "student" && (
              <Link onClick={() => setVisble(false)} to="/book" className='py-2 pl-6 border'>BOOK</Link>
            )}
            <Link onClick={() => setVisble(false)} to='/feedback' className='py-2 pl-6 border'>AI MENTOR</Link>
            <Link onClick={() => setVisble(false)} to='/trends' className='py-2 pl-6 border'>TRENDS</Link>
            {token &&
              <Link onClick={() => setVisble(false)} to="/my-sessions" className='py-2 pl-6 border'>MY SESSIONS</Link>
            }
            {user?.role === "mentor" && (
              <Link onClick={() => setVisble(false)} to="/mentor-profile" className='py-2 pl-6 border'>MY PROFILE</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
