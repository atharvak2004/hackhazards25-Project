import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateCircleForm({ onCreated }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/circles",
        { name },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Circle created ✅");
      onCreated();
      setTimeout(() => navigate("/circles"), 1000);
    } catch (err) {
      setMessage("Failed to create circle.");
    }
  };

  return (
    <div>
    <div className="max-w-md mx-auto mt-24 p-6 bg-blue-100 rounded shadow">
      <h2 className="text-3xl font-bold mb-4">Create a Circle...</h2>
      {message && <p className="mb-3 text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Circle Name</label>
        <input
          className="w-full p-2 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Create
        </button>
      </form>
    </div>
    </div>
  );
}

export default CreateCircleForm;
