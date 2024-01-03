import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/homepage.css";

const Homepage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="homepage">
      <Sidebar />
      <div className="content">
        <h1>Home</h1>
        <div className="diagram-section">
          <div className="income-container">
            <a>income</a>
          </div>
          <div className="outcome-container">
            <a>Outcome</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
