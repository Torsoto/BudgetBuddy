import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firestore.mjs';
import { signOut } from "firebase/auth";
import { FaHome, FaRegListAlt, FaRegMoneyBillAlt, FaCog, FaRegQuestionCircle } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";
import '../styles/Sidebar.css';

const logOut = () => {
  signOut(auth).then(() => {
    console.log('User signed out');
  }).catch((error) => {
    console.log(error);
  });
}


const Sidebar = ({ className }) => {
  return (
    <div className={`sidebar ${className}`}>
      <div >
        <ul>
          <li>
            <FaHome className="sidebar-icon" />
            <Link to="/Home">Home</Link>
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
      <div className='logOut-container'>
        <Link className='logOut-link' onClick={logOut} to="/">
          <IoIosLogOut className='logOut-icon' />
          <p className='logOut-button'>Log out</p>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar;