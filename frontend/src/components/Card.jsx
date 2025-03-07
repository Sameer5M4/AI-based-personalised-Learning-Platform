import React from "react";

const Card = ({ title, value, icon, bgColor }) => {
  return (
    <div
      className={`p-6 rounded-2xl shadow-md flex items-center gap-4 ${bgColor} text-white`}
    >
      <div className="text-3xl">{icon}</div>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Card;
