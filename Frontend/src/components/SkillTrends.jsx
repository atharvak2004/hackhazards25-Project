import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SkillTrends() {
  const [skillCounts, setSkillCounts] = useState({});

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/trends");
        setSkillCounts(res.data);
      } catch (err) {
        console.error("Error fetching trends:", err);
      }
    };

    fetchTrends();
  }, []);

  const chartData = Object.entries(skillCounts).map(([skill, count]) => ({
    skill,
    count,
  }));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">📊 Skill Trends</h2>

      {/* Tag list */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {chartData.map((item) => (
          <span
            key={item.skill}
            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
          >
            {item.skill} ({item.count})
          </span>
        ))}
      </div>

      {/* Bar chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="skill" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SkillTrends;
