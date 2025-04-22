import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Title from "../components/Title";

function Trends() {
  const [trends, setTrends] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Fetch trending skills
    const fetchTrends = async () => {
      try {
        const res = await fetch("/api/trends");
        const data = await res.json();
        setTrends(data);
      } catch (error) {
        console.error("Failed to load trends:", error);
      }
    };

    fetchTrends();
  }, []);

  useEffect(() => {
    // Connect to WebSocket for real-time news
    const socket = io("http://localhost:5000");

    socket.on("techNews", (data) => {
      setNews(data.slice(0, 5)); // display top 5
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c081c] to-[#1a073e] text-white p-6">
      <div className="mt-32 flex flex-col items-center text-center">
        <Title text1="Skill" text2="Trends" />
      </div>

      {/* Skill Trends Chart */}
      <div className="text-center p-6 max-w-6xl mx-auto w-full">
        <p className="text-white mb-6 text-lg sm:text-xl">Trending Skills</p>
        <div className="w-full h-[400px] bg-transparent rounded-xl p-4 shadow-lg mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trends} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={100}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#7c3aed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tech News Section */}
      <div className="max-w-4xl mx-auto mt-10 bg-white text-black p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-3xl">Latest Tech News</h2>
        {news.length === 0 ? (
          <p className="text-center text-gray-500">Loading latest tech news...</p>
        ) : (
          <ul className="space-y-4">
            {news.map((article, index) => (
              <li key={index} className="hover:bg-gray-100 p-2 rounded-lg transition-all">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-700 hover:underline"
                >
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Trends;
