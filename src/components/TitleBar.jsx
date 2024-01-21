import React, { useEffect, useState, useContext } from "react";
import "../styles/TitleBar.css";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firestore.mjs"; // Adjust the path as necessary
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { FaRegBell } from "react-icons/fa";

const TitleBar = ({ onToggleSidebar, darkMode, setDarkMode }) => {
  const { profileImage } = useContext(GlobalContext);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
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

  const fetchNotifications = async () => {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid;
      const notificationsRef = collection(db, 'users', userUid, 'notifications');
      // Create a query that orders notifications by time, latest first
      const orderedQuery = query(notificationsRef, orderBy("time", "desc"));
      const querySnapshot = await getDocs(orderedQuery);
      const fetchedNotifications = querySnapshot.docs.map(doc => ({
        message: doc.data().message,
        time: doc.data().time // Assuming you have a 'time' field
      }));
      setNotifications(fetchedNotifications);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);



  return (
    <div className="topbar">
      <div className="titlebar">
        <button
          id="showHideMenus"
          className="toggleButton"
          onClick={onToggleSidebar}
        ></button>
        <FaRegBell className="bell" onClick={() => { setShowNotifDropdown(prev => !prev); fetchNotifications(); }} />
        {showNotifDropdown && (
          <div className="notification-dropdown">
            <h4>Notifications</h4>
            {notifications.length > 0 ? (
              notifications.map((notif, index) => (
                <div key={index} className="notification-item">
                  {notif.message} <br />
                  <small>{new Date(notif.time).toLocaleString()}</small>
                </div>
              ))
            ) : (
              <div className="notification-item">No new notifications</div>
            )}
          </div>
        )}
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
      <div className="titleBarBtns">

        <button id="minimize" className="topBtn minimizeBtn"></button>
        <button id="maximize" className="topBtn maximizeBtn"></button>
        <button id="close" className="topBtn closeBtn"></button>
      </div>
    </div>
  );
};

export default TitleBar;