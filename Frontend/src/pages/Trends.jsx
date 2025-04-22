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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"; // Add API base URL here

function Trends() {
  const [trends, setTrends] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Fetch trending skills
    const fetchTrends = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/trends`); // Updated API URL
        const data = await res.json();
        setTrends(data);
      } catch (error) {
        console.error("Failed to load trends:", error);
      }
    };

    fetchTrends();
  }, []);

  useEffect(() => {
    const socket = io(API_BASE_URL); // Updated socket URL

    socket.on("techNews", (data) => {
      setNews(data.slice(0, 10)); 
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
        <p className="text-white mb-6 text-lg">Trending Skills</p>
        <div className="w-full h-[400px] bg-transparent rounded-xl p-4 mx-auto">
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
      <div className="max-w-auto mx-auto mt-10 bg-transpertent text-black p-6 rounded-xl mb-20">
        <div className=" mb-16 text-center">
          <Title text1={"Latest"} text2={"Tech News"} />
        </div>
        <h2 className="text-2xl font-bold"> </h2>
        {news.length === 0 ? (
          <p className="text-center text-gray-500">Loading latest tech news...</p>
        ) : (
          <ul className="space-y-4 lg:pl-40 ">
            {news.map((article, index) => (
              <li key={index} className=" p-2 rounded-lg transition-all">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-xl hover:underline"
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
