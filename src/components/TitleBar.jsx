import React, { useEffect } from "react";
import Switch from "@mui/material/Switch"; // Importieren Sie die Switch-Komponente
import "../styles/TitleBar.css";
import BudgetBuddyLogo from "../assets/BudgetBuddyLogo.png";
import { useContext } from "react";
import { ProfileImageContext } from "../context/ProfileImageContext";
import { useNavigate } from "react-router-dom";

const TitleBar = ({ onToggleSidebar, darkMode, setDarkMode }) => {
  const { profileImage } = useContext(ProfileImageContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("minimize").addEventListener("click", () => {
      window.electron.minimizeApp();
    });

    document.getElementById("maximize").addEventListener("click", () => {
      window.electron.maximizeApp();
    });

    document.getElementById("close").addEventListener("click", () => {
      window.electron.closeApp();
    });
  }, []);

  const handleProfileClick = () => {
    console.log("Profile clicked"); 
    navigate("/Settings");
  };

  return (
    <div className="topbar">
      <div className="titlebar">
        <button
          id="showHideMenus"
          className="toggleButton"
          onClick={onToggleSidebar}
        ></button>
        <img id="bb-logo" src={BudgetBuddyLogo} alt="Budget Buddy Logo" />
        <div className="title">BudgetBuddy</div>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="darkModeSwitch"
        />{" "}
        {/* Verwenden Sie die Switch-Komponente */}
        <p>Change Theme</p>
        {profileImage && (
          <img
            src={profileImage}
            alt="Profile"
            className="profile-image"
            onClick={handleProfileClick}
          />
        )}
      </div>
      <div className="titleBarBtns">
        <button id="minimize" className="topBtn minimizeBtn"></button>
        <button id="maximize" className="topBtn maximizeBtn"></button>
        <button id="close" className="topBtn closeBtn"></button>
      </div>
    </div>
  );
};

export default TitleBar;
