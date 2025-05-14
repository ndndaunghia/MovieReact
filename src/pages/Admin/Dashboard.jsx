import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Movies</h3>
          <p>150</p>
        </div>
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>1,234</p>
        </div>
        <div className="stat-card">
          <h3>Total Categories</h3>
          <p>12</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 