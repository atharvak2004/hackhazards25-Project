import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"; // Add API base URL here

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // default
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, formData); // Updated API URL

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/my-sessions");
    } catch (err) {
      const message = err.response?.data?.message;

      if (message === "Email already registered.") {
        alert("Email is already registered. Redirecting to login...");
        navigate("/login");
      } else {
        setError(message || "Signup failed. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-[radial-gradient(circle_at_center,_#C40AB5,_#060666,_#08042E)] flex flex-col justify-center items-center">
      <div className="max-w-md mx-auto p-8 mt-4 rounded-2xl border border-black">
        <h2 className="prata-regular text-4xl font-bold mb-4 text-center text-white ">SignUp...</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <input
            type="text"
            name="name"
            placeholder="Full Name..."
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email..."
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password..."
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="student">I am a Student</option>
            <option value="mentor">I am a Mentor</option>
          </select>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-7/12 bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center text-md mt-4 text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-slate-300 hover:underline text-lg">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
