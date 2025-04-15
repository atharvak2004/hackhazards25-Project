import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-100 text-black p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">AI Mentor</h1>

        <div className="space-x-5">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/mentors" className="hover:underline">Mentors</Link>

          {/* 👇 Only show for students */}
          {user?.role === "student" && (
            <Link to="/book" className="hover:underline">Book</Link>
          )}

          <Link to="/feedback" className="hover:underline">AI Mentor</Link>
          <Link to="/trends" className="hover:underline">Trends</Link>
          {token && <Link to="/my-sessions" className="hover:underline">My Sessions</Link>}

          {/* 👇 Only show for mentors */}
          {user?.role === "mentor" && (
            <Link to="/mentor-profile" className="hover:underline">My Profile</Link>
          )}
        </div>

        <div className="space-x-3">
          {token ? (
            <>
              <span className="text-sm">Hello, {user?.name?.split(" ")[0]} 👋</span>
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
