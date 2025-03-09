import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled container for the circular progress
const ProgressContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;

// Styled SVG Circle for Background (Gray Circle)
const CircleBackground = styled.circle`
  fill: none;
  stroke: #e0e0e0;
  stroke-width: 10;
`;

// Styled SVG Circle for Progress (Animated Stroke)
const CircleProgress = styled.circle`
  fill: none;
  stroke: rgb(45, 105, 245); /* Progress color */
  stroke-width: 10;
  stroke-linecap: round;
  stroke-dasharray: 314; /* Circumference of circle (2 * π * r) */
  stroke-dashoffset: ${({ progress }) => 314 - (314 * progress) / 100}; /* Dynamic progress */
  transition: stroke-dashoffset 1s ease-in-out; /* Smooth transition */
  transform: rotate(-90deg); /* Start from the top */
  transform-origin: center;
`;

// Styled Percentage Text Inside Circle
const PercentageText = styled.text`
  font-size: 23px;
  font-weight: bold;
  fill: black;
  text-anchor: middle;
  dominant-baseline: middle;
`;

const CircularProgress = ({ progress }) => {
  const [newprogress, setNewProgress] = useState(0); // Start at 0 for smooth animation

  useEffect(() => {
    setTimeout(() => {
      setNewProgress(progress); // Animate to the actual progress
    }, 100); // Delay for smooth effect
  }, [progress]);

  return (
    <ProgressContainer>
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Background Circle */}
        <CircleBackground cx="60" cy="60" r="50" />

        {/* Progress Circle */}
        <CircleProgress cx="60" cy="60" r="50" progress={newprogress} />

        {/* Text inside Circle */}
        <PercentageText x="60" y="60" className="transform transition-transform duration-1000" >{`${progress}%`}</PercentageText>
      </svg>
    </ProgressContainer>
  );
};

export default CircularProgress;
