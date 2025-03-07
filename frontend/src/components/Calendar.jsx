import React, { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="p-5 bg-white rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
          ◀️
        </button>
        <h2 className="text-lg font-bold">{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
          ▶️
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold">
            {day}
          </div>
        ))}
        {/* Add logic to generate dates dynamically */}
      </div>
    </div>
  );
};

export default Calendar;
