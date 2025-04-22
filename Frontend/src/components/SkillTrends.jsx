import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const SkillTrends = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/trends');
        const data = await res.json();
        setTrends(data);
      } catch (error) {
        console.error('Failed to load trends:', error);
      }
    };

    fetchTrends();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <p className="text-white mb-6 text-lg sm:text-xl font-semibold text-center">
        Trending Skills
      </p>

      <div className="h-[300px] sm:h-[400px] md:h-[500px] bg-transparent rounded-xl shadow-lg">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trends} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              interval={0}
              height={70}
              tick={{ fontSize: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#7c3aed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillTrends;
