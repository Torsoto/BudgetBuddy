import React, { useEffect, useState } from "react";
import "../styles/TitleBar.css";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firestore.mjs"; // Adjust the path as necessary
import { signOut } from "firebase/auth";
import { IoIosNotificationsOutline } from "react-icons/io";

const TitleBar = ({ onToggleSidebar }) => {
  const { profileImage, notificationsLimit } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([" ", " ", " ", " ", " "]);

  useEffect(() => {
    console.log("Aktueller Wert von notificationsLimit:", notificationsLimit);
    if (notificationsLimit && notificationsLimit.length > 0) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        ...notificationsLimit,
      ]);
    }
    console.log("Aktualisierte Benachrichtigungen:", notifications);

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
  }, [notificationsLimit]);

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

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="topbar">
      <div className="titlebar">
        <button
          id="showHideMenus"
          className="toggleButton"
          onClick={onToggleSidebar}
        ></button>
        <div className="title">BudgetBuddy</div>
        {profileImage && (
          <img
            src={profileImage}
            alt="Profile"
            className="profile-image"
            onClick={handleProfileClick}
          />
        )}
      </div>
      <div>
        <IoIosNotificationsOutline
          className="notification-icon"
          onClick={toggleDropdown}
        />
        {isOpen && (
          <div className="dropdown">
            {
              <div className="dropdown-notification">
                <h4>Notifications</h4>
                <ul>
                  {notificationsLimit.map((notification, index) => (
                    <li key={index}>{notification}</li>
                  ))}
                </ul>
              </div>
            }
          </div>
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
