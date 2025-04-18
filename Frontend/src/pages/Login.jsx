import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);

      // Store token + user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect to /my-sessions
      navigate("/my-sessions");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-100 to-white ">
      <div className="max-w-md mx-auto p-6 mt-10 bg-blue-100 rounded border border-black">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-7/12 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
      </div >
    </div >
  );
}

export default Login;
