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
    <div className="text-center p-6 max-w-6xl mx-auto">
      
      <p className="text-white mb-6 text-lg">Trending Skills</p>

      <div className="mt-12 w-[900px] h-[500px] bg-transperent rounded-xl p-4 shadow-lg mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={trends}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
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
  );
};

export default SkillTrends;
