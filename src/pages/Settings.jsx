import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Settings.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { auth } from "../../firebase/firestore.mjs";
import { useContext, useEffect } from "react";
import { ProfileImageContext } from "../context/ProfileImageContext";

const Settings = () => {
  const [email, setEmail] = useState(null);
  const { profileImage, setProfileImage } = useContext(ProfileImageContext);
  const [image, setImage] = useState(profileImage); // Initialisieren mit dem globalen Profilbild

  useEffect(() => {
    setImage(profileImage); // Aktualisieren, wenn sich das globale Profilbild ändert
  }, [profileImage]);

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

  const handleChangePassword = () => { };

  return (
    <div className="Settings">
      <div className="content">
        <h1>Settings</h1>
        <div className="profile-container">
          <label>
            Profile Picture:
            <input
              type="file"
              name="profile-picture"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          {image && <img src={image} alt="Profile" className="profile-image" />}{" "}
          <label>Email: {email}</label>
          <button
            className="change-password-button"
            onClick={handleChangePassword}
          >
            Change Password
          </button>
        </div>
        <Link to="/">
          <button>Log Out</button>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
