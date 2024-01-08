import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaRegListAlt, FaRegMoneyBillAlt, FaCog, FaRegQuestionCircle } from 'react-icons/fa';
import '../styles/Sidebar.css'; // Assuming you have a CSS file for styling the sidebar

const Sidebar = ({ className }) => {
  return (
    <div className={`sidebar ${className}`}>
      <ul>
        <li>
          <FaHome className="sidebar-icon" /><Link to="/Home">Home</Link>
        </li>
        <li>
          <FaRegListAlt className="sidebar-icon" /><Link to="/Entries">Entries</Link>
        </li>
        <li>
          <FaRegMoneyBillAlt className="sidebar-icon" /><Link to="/BudgetGoals">Budget Goals</Link>
        </li>
        <li>
          <FaCog className="sidebar-icon" /><Link to="/Settings">Settings</Link>
        </li>
        <li>
          <FaRegQuestionCircle className="sidebar-icon" /><Link to="/Support">Support</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;