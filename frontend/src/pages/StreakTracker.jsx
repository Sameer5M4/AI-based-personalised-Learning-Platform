import React from "react";

const StreakTracker = () => {
    const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
    const days = ["Mon", "Wed", "Fri"];
    const weeks = 52;
    const contributions = Array(weeks * 7).fill(0);
  
    // Corrected contribution placements
    const customContributions = {
      [(weeks - 6) * 7 + 1]: 1, // Light Green (January)
      [(weeks - 3) * 7 + 4]: 2, // Medium Green (February)
      [(weeks - 3) * 7 + 5]: 3, // Dark Green (February)
      [(weeks - 2) * 7 + 2]: 2, // Medium Green (February)
      [(weeks - 2) * 7 + 3]: 1, // Light Green (February)
    };
  
    Object.keys(customContributions).forEach((key) => {
      contributions[key] = customContributions[key];
    });
  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg w-full max-w-2xl">
      <h2 className="text-lg font-semibold mb-2">33 contributions in the last year</h2>
      <div className="flex justify-between text-sm text-gray-400 mb-1">
        {months.map((month, index) => (
          <span key={index} className="w-8 text-center">
            {month}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-52 gap-1">
        {contributions.map((value, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-sm ${
              value === 0 ? "bg-gray-700" :
              value === 1 ? "bg-green-500" :
              value === 2 ? "bg-green-600" :
              "bg-green-700"
            }`}
          ></div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-sm text-gray-400">
        {days.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
    </div>
  );
};

export default StreakTracker;