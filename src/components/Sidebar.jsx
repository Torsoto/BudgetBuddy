import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css'; // Assuming you have a CSS file for styling the sidebar
import Home from "../../public/Home.svg"
import Entries from "../../public/Entries.svg"
import BudgetGoals from "../../public/BudgetGoals.png"
import Settings from "../../public/Settings.svg"


const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <img src={Home} alt="Home" />
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <img src={Entries} alt="Entries" />
          <Link to="/Entries">Entries</Link>
        </li>
        <li>
          <img src={BudgetGoals} alt="Budget Goals" />
          <Link to="/BudgetGoals">Budget Goals</Link>
        </li>
        <li>
          <img src={Settings} alt="Settings" />
          <Link to="/Settings">Settings</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;

