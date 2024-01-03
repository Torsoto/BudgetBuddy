import React from 'react'
import Sidebar from '../components/Sidebar';
import { Link } from "react-router-dom";

const Settings = () => {

  return (
    <div className='Settings'>
      <Sidebar></Sidebar>
      <div className='content'>
        <h1>Settings</h1>
        <Link to="/">
          <button>Log Out</button>
        </Link>
      </div>
    </div>
  )
}

export default Settings