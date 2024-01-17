import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Settings.css";
import { useContext, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase/firestore.mjs";
import { GlobalContext } from "../context/GlobalContext";
import noProfile from "../assets/NoProfile.jpg";


const Settings = () => {
  const [email, setEmail] = useState(null);
  const { profileImage, setProfileImage, graphType, setGraphType } = useContext(GlobalContext);
  const [image, setImage] = useState(profileImage || noProfile);

  useEffect(() => {
    if (profileImage) {
      setImage(profileImage);
    }
    setEmail(fetchEmail());
  }, [profileImage]);

  const fetchEmail = () => {
    const user = auth.currentUser;
    return user.email;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGraphTypeChange = (event) => {
    setGraphType(event.target.value);
  };

  const handleChangePassword = () => { };

  return (
    <div className="Settings">
      <div className="content">
        <h1>Settings</h1>
        <div className="profile-container">
          <input
            id="profile-picture-input"
            type="file"
            name="profile-picture"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="profile-picture-input">
            <img src={image} alt="Profile" className="profile-image" style={{ cursor: 'pointer' }} />
          </label>
          <label>Email: {email}</label>
          <button
            className="change-password-button"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
          <label className="graph-label">
            Graph Type:
            <select className="graph-selection" value={graphType} onChange={handleGraphTypeChange}>
              <option value="Doughnut">Doughnut</option>
              <option value="Bar">Bar</option>
              <option value="Line">Line</option>
              {/* Add more graph types as needed */}
            </select>
          </label>
        </div>
        <Link to="/">
          <button>Log Out</button>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
