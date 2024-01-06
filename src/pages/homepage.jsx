import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/homepage.css";

const Homepage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="homepage">
      <Sidebar />
      <div className="content">
        <div className="diagram-section">
          <div className="container income-container">
            <a>Income</a>
          </div>
          <div className="container outcome-container">
            <a>Outcome</a>
          </div>
        </div>

        {/* Table for Expenses */}
        <div className="expense-table">
          <table>
            <thead>
              <tr>
                <th>Expense</th>
                <th>Date</th>
                <th>Source</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Expense 1</td>
                <td>01/01/2024</td>
                <td>Source 1</td>
                <td>Category 1</td>
              </tr>
              {/* Add more rows for additional expenses */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Homepage;