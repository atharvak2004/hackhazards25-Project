import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [visible, setVisble] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"
      } bg-transparent backdrop-blur-sm`}>
      <div className="flex items-center justify-between py-5 font-medium">
        <Link to="/" className="text-xl font-bold pl-6 text-white">AI Mentor</Link>

        <div className="hidden sm:flex gap-5 text-sm text-gray-700">
          <Link to="/" className="flex flex-col items-center gap-1">
            <p className="text-gray-400 hover:underline hover:text-white">HOME</p>
          </Link>
          <Link to="/mentors" className="flex flex-col items-center gap-1">
            <p className="text-gray-400 hover:underline hover:text-white">MENTORS</p>
          </Link>
          {user?.role === "student" && (
            <Link to="/book" className="flex flex-col items-center gap-1">
              <p className="text-gray-400 hover:underline hover:text-white">BOOK</p>
            </Link>
          )}
          <Link to="/feedback" className="flex flex-col items-center gap-1">
            <p className="text-gray-400 hover:underline hover:text-white">AI MENTOR</p>
          </Link>
          <Link to="/trends" className="flex flex-col items-center gap-1">
            <p className="text-gray-400 hover:underline hover:text-white">TRENDS</p>
          </Link>
          {token && (
            <Link to="/my-sessions" className="flex flex-col items-center gap-1">
              <p className="text-gray-400 hover:underline hover:text-white">MY SESSIONS</p>
            </Link>
          )}
          {token && (
            <Link to="/circles" className="flex flex-col items-center gap-1">
            <p className="text-gray-400 hover:underline hover:text-white">CIRCLES</p>
          </Link>
          )}
          
          {user?.role === "mentor" && (
            <Link to="/mentor-profile" className="flex flex-col items-center gap-1">
              <p className="text-gray-400 hover:underline hover:text-white">MENTOR PROFILE</p>
            </Link>
          )}
          {user?.role === "student" && (
            <Link to="/student-profile" className="flex flex-col items-center gap-1">
              <p className="text-gray-400 hover:underline hover:text-white">STUDENT PROFILE</p>
            </Link>
          )}
        </div>

        <div className="flex flex-row space-x-3 p-3">
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:underline text-white">Login</Link>
              <Link to="/register" className="hover:underline text-white">Signup</Link>
            </>
          )}
          <img
            onClick={() => setVisble(true)}
            className="w-5 cursor-pointer sm:hidden"
            src="/assets/menu.png"
            alt="menu"
          />
        </div>

        <div
          className={`fixed top-0 left-0 h-screen w-screen bg-gray-200 transition-all duration-300 z-50 ${visible ? "translate-x-0" : "translate-x-full"
            }`}>
          <div className="flex flex-col text-gray-600 w-screen">
            <div onClick={() => setVisble(false)} className="flex items-center gap-4 p-3">
              <img className="h-4 rotate-180" src="/assets/back.png" alt="back" />
              <p>Back</p>
            </div>
            <Link onClick={() => setVisble(false)} to="/" className="py-2 pl-6 border inset-0 z-100">HOME</Link>
            <Link onClick={() => setVisble(false)} to="/mentors" className="py-2 pl-6 border inset-0 z-100">MENTORS</Link>
            {user?.role === "student" && (
              <Link onClick={() => setVisble(false)} to="/book" className="py-2 pl-6 border inset-0 z-100 ">BOOK</Link>
            )}
            <Link onClick={() => setVisble(false)} to="/feedback" className="py-2 pl-6 border inset-0 z-100">AI MENTOR</Link>
            <Link onClick={() => setVisble(false)} to="/trends" className="py-2 pl-6 border">TRENDS</Link>
            {token && (
              <Link onClick={() => setVisble(false)} to="/my-sessions" className="py-2 pl-6 border">MY SESSIONS</Link>
            )}
            {token && (
              <Link onClick={() => setVisble(false)} to="/circles" className="py-2 pl-6 border">Circles </Link>
            )}
            {user?.role === "mentor" && (
              <Link onClick={() => setVisble(false)} to="/mentor-profile" className="py-2 pl-6 border">MY PROFILE</Link>
            )}
            {user?.role === "student" && (
              <Link onClick={() => setVisble(false)} to="/student-profile" className="py-2 pl-6 border">MY PROFILE</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
