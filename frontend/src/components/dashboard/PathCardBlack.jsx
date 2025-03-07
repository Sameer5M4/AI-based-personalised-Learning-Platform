import React from 'react';
import styled from 'styled-components';

const PathCardBlack = ({ name }) => {
  return (
    <StyledWrapper>
      <div className="progress-app ">
        <main className="progress-container ">
          <div className="progress-panel bg-gray-900">
            <div className="panel-header">
              <div className="system-status">
                <span className="status-indicator" />
                <span className="status-text">{name}</span>
              </div>
            </div>
            <div className="progress-section">
              <div className="progress-wrapper">
                <div aria-valuemax={100} aria-valuemin={0} aria-valuenow={4} role="progressbar" className="progress-bar">
                  <div className="progress-line" />
                  <div className="progress-particles" />
                </div>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-value">4.00%</span>
                  <span className="info-label">COMPLETED</span>
                </div>
                <div className="info-item">
                  <span className="info-value">13</span>
                  <span className="info-label">DAYS ACTIVE</span>
                </div>
                <div className="info-item">
                  <span className="info-value">352</span>
                  <span className="info-label">DAYS REMAINING</span>
                </div>
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .progress-app {
    font-family:
      "Inter",
      -apple-system,
      BlinkMacSystemFont,
      sans-serif;
    color: #ffffff;
    line-height: 1.5;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .progress-panel {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 26px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .panel-header {
    margin-bottom: 24px;
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
    background: #00ff9d;
    border-radius: 50%;
    animation: pulse 2s infinite ease-in-out;
  }

  .status-text {
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 1px;
  }

  .progress-section {
    margin-bottom: 24px;
  }

  .progress-wrapper {
    position: relative;
    height: 35px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 20px;
  }

  .progress-bar {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .progress-line {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4%;
    background: linear-gradient(
      90deg,
      rgba(0, 255, 157, 0.7),
      rgba(0, 255, 157, 0.3)
    );
    border-radius: 20px;
    animation: progressGlow 2s infinite;
  }

  .progress-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.2) 1px,
      transparent 1px
    );
    background-size: 8px 8px;
    animation: particleFlow 20s linear infinite;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 20px;
    margin-bottom: -20px;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .info-value {
    font-size: 24px;
    font-weight: 700;
    color: #00ff9d;
    text-shadow: 0 0 10px rgba(0, 255, 157, 0.3);
    margin-bottom: 4px;
  }

  .info-label {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 0.5px;
  }


  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
  }

  @keyframes progressGlow {
    0%,
    100% {
      opacity: 1;
      box-shadow: 0 0 20px rgba(0, 255, 157, 0.3);
    }
    50% {
      opacity: 0.8;
      box-shadow: 0 0 30px rgba(0, 255, 157, 0.5);
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
    .status-indicator,
    .progress-line,
    .progress-particles {
      animation: none;
    }
  }`;

export default PathCardBlack;
