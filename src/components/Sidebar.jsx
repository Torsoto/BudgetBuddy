import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css'; // Assuming you have a CSS file for styling the sidebar
import Home from "../assets/Home.svg"
import Entries from "../assets/Entries.svg"
import BudgetGoals from "../assets/BudgetGoals.png"
import Settings from "../assets/Settings.svg"


const Sidebar = () => {
  return (
    <div className="sidebar">
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
