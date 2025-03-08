import React from "react";

const Audio = () => {
  const loaderContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const barStyle = {
    width: "6px",
    height: "40px", // Set a fixed height for all bars
    margin: "0 3px",
    borderRadius: "5px",
    display: "inline-block",
    animation: "bounce 0.7s infinite", // Animation duration for faster speed
  };

  const colors = ["red", "blue", "green", "yellow", "purple"];

  return (
    <div style={loaderContainerStyle}>
      {colors.map((color, index) => (
        <div
          key={index}
          style={{
            ...barStyle,
            backgroundColor: color,
            animationDelay: `${index * 0.1}s`, // Stagger the animation
          }}
        />
      ))}
      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: scaleY(1); // Original height
            }
            50% {
              transform: scaleY(1.5); // Increase height at the midpoint
            }
          }
        `}
      </style>
    </div>
  );
};

export default Audio;
