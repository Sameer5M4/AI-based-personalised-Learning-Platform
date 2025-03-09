import React from 'react';
import styled from 'styled-components';

const PathCard = ({ name, completed, active, remaining }) => {
  return (
    <StyledWrapper>
      <div className="progress-app">
        <main className="progress-container cursor-pointer hover:scale-104 transition-transform duration-300">
          <div className="progress-panel">
            <div className="panel-header">
              <div className="system-status">
                <span className="status-indicator" />
                <span className="status-text w-full">{name}</span>
              </div>
            </div> 
            <div className="progress-section">
              <div className="progress-wrapper">
                <div
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={completed}
                  role="progressbar"
                  className="progress-bar"
                >
                  {/* Dynamic Progress Line */}
                  <div className="progress-line" style={{ width: `${completed}%` }} />
                  <div className="progress-particles" />
                </div>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-value">{completed}.00%</span>
                  <span className="info-label">COMPLETED</span>
                </div>
                <div className="info-item">
                  <span className="info-value">{0}</span>
                  <span className="info-label"> ACTIVE</span>
                </div>
                <div className="info-item">
                  <span className="info-value">{remaining}</span>
                  <span className="info-label">REMAINING</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .progress-app {
    font-family: "Inter", sans-serif;
    color: #333333;
    line-height: 1.5;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .progress-panel {
    background: #ffffff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .panel-header {
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .system-status {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status-indicator {
    width: 8px;
    height: 8px;
    background: #4a90e2;
    border-radius: 50%;
    animation: pulse 2s infinite ease-in-out;
  }

  .status-text {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    letter-spacing: 1px;
  }

  .progress-section {
    margin-bottom: 24px;
  }

  .progress-wrapper {
    position: relative;
    height: 25px;
    background: #e0e0e0;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 16px;
  }

  .progress-bar {
    position: relative;
    width: 100%;
    height: 100%;
  }

  /* Progress Line dynamically updated */
  .progress-line {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: linear-gradient(90deg, #1260F1, #4a90e2, #6ec6ff);
    border-radius: 20px;
    transition: width 0.5s ease-in-out;
    animation: progressGlow 2s infinite;
  }

  .progress-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at center, rgba(74, 144, 226, 0.2) 2px, transparent 1px);
    background-size: 8px 8px;
    animation: particleFlow 20s linear infinite;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 24px;
    margin-bottom: -20px;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .info-value {
    font-size: 18px;
    font-weight: 700;
    color: #4a90e2;
    text-shadow: 0 0 10px rgba(74, 144, 226, 0.3);
    margin-bottom: 4px;
  }

  .info-label {
    font-size: 10px;
    color: rgba(51, 51, 51, 0.6);
    letter-spacing: 0.5px;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
  }

  @keyframes progressGlow {
    0%, 100% {
      opacity: 1;
      box-shadow: 0 0 20px rgba(74, 144, 226, 0.3);
    }
    50% {
      opacity: 0.8;
      box-shadow: 0 0 30px rgba(74, 144, 226, 0.5);
    }
  }

  @keyframes particleFlow {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0;
    }
  }

  @media (max-width: 600px) {
    .info-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .info-value {
      font-size: 20px;
    }

    .progress-wrapper {
      height: 32px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .status-indicator, .progress-line, .progress-particles {
      animation: none;
    }
  }
`;

export default PathCard;
