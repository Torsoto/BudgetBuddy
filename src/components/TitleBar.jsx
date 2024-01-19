import React, { useEffect } from "react";
import Switch from "@mui/material/Switch"; // Importieren Sie die Switch-Komponente
import "../styles/TitleBar.css";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firestore.mjs"; // Adjust the path as necessary
import { signOut } from "firebase/auth";

const TitleBar = ({ onToggleSidebar, darkMode, setDarkMode }) => {
  const { profileImage } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("minimize").addEventListener("click", () => {
      window.electron.minimizeApp();
    });

    document.getElementById("maximize").addEventListener("click", () => {
      window.electron.maximizeApp();
    });

    const closeBtn = document.getElementById("close");
    closeBtn.addEventListener("click", handleAppClose);

    return () => {
      closeBtn.removeEventListener("click", handleAppClose);
    };
  }, []);

  const handleAppClose = async () => {
    // Log out user before closing the app
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }

    window.electron.closeApp();
  };

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
        <div className="title">BudgetBuddy</div>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="darkModeSwitch"
        />
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
