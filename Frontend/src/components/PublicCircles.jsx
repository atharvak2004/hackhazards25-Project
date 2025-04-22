import React, { useEffect, useState } from "react";
import axios from "axios";

const PublicCircles = ({ onOpen }) => {
  const [circle, setCircle] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getPublicCircle = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/circles/public", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCircle(res.data);
      } catch (err) {
        console.error("Failed to load public circle", err);
      } finally {
        setLoading(false);
      }
    };

    getPublicCircle();
  }, []);

  if (loading || !circle) return null;

  return (
    <div className="mt-8 text-white">
      <h2 className="text-xl font-semibold mb-2">Community Circle</h2>
      <div className="bg-white text-black p-4 rounded shadow">
        <h3 className="text-xl font-bold"> {circle.name}</h3>
        <p className="text-sm text-gray-600 mb-3">
          Members: {circle.members?.length || 0}
        </p>
        <button
          onClick={() => onOpen(circle)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Open Chat →
        </button>
      </div>
    </div>
  );
};

export default PublicCircles;
