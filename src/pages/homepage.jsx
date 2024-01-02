import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
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
        <Link to="/login">
          <button>Go to Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
