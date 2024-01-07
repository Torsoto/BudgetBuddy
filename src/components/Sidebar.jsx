import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css'; // Assuming you have a CSS file for styling the sidebar


const Sidebar = ({ className }) => {
  return (
    <div className={`sidebar ${className}`}>
      <ul>
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/Entries">Entries</Link>
        </li>
        <li>
          <Link to="/BudgetGoals">Budget Goals</Link>
        </li>
        <li>
          <Link to="/Settings">Settings</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;

