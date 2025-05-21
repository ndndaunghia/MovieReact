import React from 'react';
import './Loading.css';

const Loading = ({ fullScreen, text = "Đang tải..." }) => {
  if (fullScreen) {
    return (
      <div className="loading-overlay">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">{text}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">{text}</div>
    </div>
  );
};

export default Loading;