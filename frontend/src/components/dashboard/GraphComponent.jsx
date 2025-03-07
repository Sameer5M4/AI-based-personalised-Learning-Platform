import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const courseColors = ["#6c5ce7", "#26de81", "#ff4757", "#ffa502", "#1e90ff", "#ff9ff3"];

const progressData = {
  "2024": [
    { month: "Jan", Web_Development: 10, AI_ML: 0, Cyber_Security: 0, Data_Science: 5 },
    { month: "Feb", Web_Development: 25, AI_ML: 14, Cyber_Security: 10, Data_Science: 18 },
    { month: "Mar", Web_Development: 40, AI_ML: 35, Cyber_Security: 25, Data_Science: 25 },
    { month: "Apr", Web_Development: 65, AI_ML: 50, Cyber_Security: 40, Data_Science: 30 },
    { month: "May", Web_Development: 80, AI_ML: 65, Cyber_Security: 53, Data_Science: 45 },
    { month: "Jun", Web_Development: 85, AI_ML: 70, Cyber_Security: 60, Data_Science: 55 },
    { month: "Jul", Web_Development: 85, AI_ML: 75, Cyber_Security: 65, Data_Science: 62 },
    { month: "Aug", Web_Development: 90, AI_ML: 85, Cyber_Security: 65, Data_Science: 75 },
    { month: "Sep", Web_Development: 100, AI_ML: 90, Cyber_Security: 75, Data_Science: 80 },
  ],
  "2025": [
    { month: "Jan", Web_Development: 10, AI_ML: 0, Cyber_Security: 0, Data_Science: 5 },
    { month: "Feb", Web_Development: 25, AI_ML: 14, Cyber_Security: 10, Data_Science: 18 },
    { month: "Mar", Web_Development: 40, AI_ML: 35, Cyber_Security: 25, Data_Science: 25 },
    { month: "Apr", Web_Development: 65, AI_ML: 50, Cyber_Security: 40, Data_Science: 30 },
    { month: "May", Web_Development: 80, AI_ML: 65, Cyber_Security: 53, Data_Science: 45 },
  ]
};

// Custom Tooltip to Show "%"" in Hover Data
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md text-gray-800">
        <p className="font-semibold text-sm">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name.replace(/_/g, " ")}: <b>{entry.value}%</b>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom Legend
const CustomLegend = ({ courses }) => {
  return (
    <div className="flex flex-wrap justify-center gap-5 mt-2">
      {courses.map((course, index) => (
        <div key={course} className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:scale-105 transition">
          <span
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: courseColors[index % courseColors.length] }}
          ></span>
          <span>{course.replace(/_/g, " ")}</span>
        </div>
      ))}
    </div>
  );
};

const GraphComponent = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const courses = Object.keys(progressData[selectedYear][0]).filter(key => key !== "month");

  return (
    <div className="bg-white p-6 pl-2 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 font-semibold pl-5">Course Progress Tracker</h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none text-gray-600"
        >
          {Object.keys(progressData).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={262}>
        <LineChart data={progressData[selectedYear]}>
          <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fill: "#2c2c2c" }} />
          <YAxis tick={{ fill: "#2c2c2c" }} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
          <Tooltip content={<CustomTooltip />} />
          
          {courses.map((course, index) => (
            <Line
              key={course}
              type="monotone"
              dataKey={course}
              stroke={courseColors[index % courseColors.length]}
              strokeWidth={3}
              dot={{ fill: courseColors[index % courseColors.length], r: 2 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Custom Legend Below the Graph */}
      <CustomLegend courses={courses} />
    </div>
  );
};

export default GraphComponent;
