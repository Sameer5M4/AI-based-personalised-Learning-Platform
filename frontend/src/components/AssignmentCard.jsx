import React from "react";
import { FaFileDownload } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";

export default function AssignmentCard({ name, duration, marksObtained, totalMarks }) {
  const percentage = ((marksObtained / totalMarks) * 100).toFixed(2);

  let badge = null;
  if (percentage >= 90) {
    badge = { text: "🥇 Gold", bgColor: "bg-yellow-500" };
  } else if (percentage >= 75) {
    badge = { text: "🥈 Silver", bgColor: "bg-gray-400" }; // Adjusted for silver effect
  } else if (percentage >= 55) {
    badge = { text: "🥉 Bronze", bgColor: "bg-amber-700" };
  }

  return (
    <div className="w-sm overflow-hidden bg-white shadow-lg rounded-2xl p-6 relative transition-all hover:shadow-xl">
      {badge && (
        <div className={`absolute top-0 right-0 text-white text-sm font-bold px-3 py-2 rounded-bl-lg ${badge.bgColor}`}>
          {badge.text}
        </div>
      )}
      <h2 className="text-xl font-bold text-gray-800 mb-2 pt-2">{name}</h2>
      <div className="flex items-center justify-between mt-4 ">
        <p className="text-gray-600 mt-0.5">⏳ Duration: {duration}</p>
        <p className="text-gray-700 text-lg font-semibold">
          🎯 Score: {marksObtained} / {totalMarks}
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mt-3 overflow-hidden">
        <div
          className="bg-blue-500 h-full transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-lg font-semibold text-gray-700">
          📊 Percentage: <span className="text-blue-600">{percentage}%</span>
        </p>
        <div className="cursor-pointer">
          <MdFileDownload color="#598170" size={"24px"} />
        </div>
      </div>

    </div>
  );
}
