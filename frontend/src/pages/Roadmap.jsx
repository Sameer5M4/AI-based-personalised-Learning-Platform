import React from 'react';
import styled from 'styled-components';

export default function Roadmap () {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="ambient-light light-1" />
        <div className="ambient-light light-2" />
        <div className="year-label">2025 Journey</div>
        <div className="roadmap rotate-90 mt-50">
          <svg width={450} height={225} viewBox="0 0 600 300">
            <path className="glow-effect" d="M30 250 C 150 250, 150 50, 300 50 C 450 50, 450 250, 570 250" />
            <path className="path" d="M30 250 C 150 250, 150 50, 300 50 C 450 50, 450 250, 570 250" />
            <path className="progress" d="M30 250 C 150 250, 150 50, 300 50 C 450 50, 450 250, 570 250" />
          </svg>
          <div className="milestone -mt-28 rotate-270 z-50 -ml-10 m1" data-month="Jan">1</div>
          <div className="milestone -mt-28 rotate-270 z-50 -ml-10 m2" data-month="Mar">3</div>
          <div className="milestone -mt-28 rotate-270 z-50 -ml-10 m3" data-month="Jun">6</div>
          <div className="milestone -mt-28 rotate-270 z-50 -ml-10 m4" data-month="Sep">9</div>
          {/* <div className="milestone -mt-28 rotate-270 z-50 -ml-10 m5" data-month="Dec">12</div> */}
        </div>
        <div className="roadmap rotate-270 -ml-72 mt-34 mb-40">
          <svg width={450} height={225} viewBox="0 0 600 300">
            <path className="glow-effect" d="M30 250 C 150 250, 150 50, 300 50 C 450 50, 450 250, 570 250" />
            <path className="path" d="M30 250 C 150 250, 150 50, 300 50 C 450 50, 450 250, 570 250" />
            <path className="progress" d="M30 250 C 150 250, 150 50, 300 50 C 450 50, 450 250, 570 250" />
          </svg>
          <div className="milestone -mt-28 -ml-10 rotate-90 m1" data-month="Jan">1</div>
          <div className="milestone -mt-28 -ml-10 rotate-90 m2" data-month="Mar">3</div>
          <div className="milestone -mt-28 -ml-10 rotate-90 m3" data-month="Jun">6</div>
          <div className="milestone -mt-28 -ml-10 rotate-90 m4" data-month="Sep">9</div>
          <div className="milestone -mt-28 -ml-10 rotate-90 m5" data-month="Dec">12</div>
          
        </div>
        <div className="percentage">4% of the Journey Complete</div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* The positioning of milestone can be easily manipulated. To optimize the overview I had to decrease the their spacing from the left. */

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 500px;
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
    background: #ffff;
    padding: 3rem;
    position: relative;
    overflow: hidden;
  }

  /* Updated progress colors back to green */
  .progress {
    fill: none;
    stroke: #00ffa3;
    stroke-width: 25;
    stroke-linecap: round;
    stroke-dasharray: 1000;
    stroke-dashoffset: 960;
    filter: blur(0.5px);
    animation: glow 3s infinite;
  }

  .glow-effect {
    fill: none;
    stroke: #00ffa3;
    stroke-width: 35;
    stroke-linecap: round;
    stroke-dasharray: 1000;
    stroke-dashoffset: 960;
    opacity: 0.15;
    filter: blur(8px);
  }

  /* Smoother milestone transitions */
  .milestone {
    cursor: pointer;
    position: fixed;
    background: #13131f;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 20px #13131f40;
  }

  .milestone:hover {
    transform: scale(1.08);
    color: #13131f;
  }

  /* Color scheme for each milestone */
  .m1 {
    --color: #ff9a9e;
  }
  .m2 {
    --color: #a78bfa;
  }
  .m3 {
    --color: #93e4ff;
  }
  .m4 {
    --color: #ffb86c;
  }
  .m5 {
    --color: #c8a2ff;
  }

  .year-label {
    font-size: 2.5rem;
    font-weight: bold;
    background: linear-gradient(90deg, #00ffa3, #00ff6a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
    text-shadow: 0 0 30px rgba(0, 255, 163, 0.3);
    letter-spacing: 1px;
  }

  .year-label::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00ffa3, transparent);
  }

  .milestone::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: var(--color);
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
  }

  .milestone:hover::before {
    opacity: 1;
    transform: scale(1.02);
  }

  .milestone::after {
    content: attr(data-month);
    position: absolute;
    top: 45px;
    font-size: 0.875rem;
    color: var(--color);
    opacity: 0.7;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: 500;
  }

  .milestone:hover::after {
    transform: translateY(3px);
    opacity: 1;
  }

  .m1 {
    top: 280px;
    left: 30px;
  }
  .m2 {
    top: 220px;
    left: 120px;
  }
  .m3 {
    top: 130px;
    left: 230px;
  }
  .m4 {
    top: 200px;
    left: 350px;
  }
  .m5 {
    top: 280px;
    left: 420px;
  }

  @keyframes glow {
    0%,
    100% {
      filter: drop-shadow(0 0 8px rgba(0, 255, 163, 0.6));
      stroke: #00ffa3;
    }
    50% {
      filter: drop-shadow(0 0 15px rgba(0, 255, 163, 0.8));
      stroke: #00ff6a;
    }
  }

  .percentage {
    cursor: pointer;
    font-size: 1.25rem;
    color: #fff;
    margin-top: 2rem;
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
  }

  .percentage:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.05);
  }

  .percentage::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  .percentage:hover::before {
    transform: translateX(100%);
  }

  .ambient-light {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.1;
    z-index: 0;
  }

  .light-1 {
    width: 200px;
    height: 200px;
    background: #ff9a9e;
    top: -100px;
    left: -100px;
  }

  .light-2 {
    width: 300px;
    height: 300px;
    background: #93e4ff;
    bottom: -150px;
    right: -150px;
  }`;

