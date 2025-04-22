import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Fetch the API base URL from environment variable
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"; // Default to localhost if not defined

function CreateCircleForm({ onCreated }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation: Name can't be empty
    if (!name.trim()) {
      setMessage("Circle name is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(
        `${API_BASE_URL}/api/circles`,  // Use the base URL here
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Circle created ✅");
      onCreated();
      setTimeout(() => navigate("/circles"), 1000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to create circle.";
      setMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-blue-100 rounded shadow">
      <h2 className="text-3xl font-bold mb-4">Create a Circle...</h2>
      {message && <p className="mb-3 text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium" htmlFor="circleName">
          Circle Name
        </label>
        <input
          id="circleName"
          className="w-full p-2 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}

export default CreateCircleForm;
