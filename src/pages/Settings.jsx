import React, { useState } from "react";
import "../styles/Settings.css";
import { useContext, useEffect } from "react";
import { updateDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { auth, db } from "../../firebase/firestore.mjs";
import { GlobalContext } from "../context/GlobalContext";
import noProfile from "../assets/NoProfile.jpg";


const Settings = () => {
  const [email, setEmail] = useState(null);
  const { profileImage, setProfileImage, incomeGraphType, setIncomeGraphType, outcomeGraphType, setOutcomeGraphType } = useContext(GlobalContext);
  const [image, setImage] = useState(profileImage || noProfile);

  const handleIncomeGraphTypeChange = (event) => {
    setIncomeGraphType(event.target.value);
  };

  const handleOutcomeGraphTypeChange = (event) => {
    setOutcomeGraphType(event.target.value);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setImage(userData.profileImageUrl || noProfile);
          setProfileImage(userData.profileImageUrl || noProfile);
        }
      }
      setEmail(fetchEmail());
    };

    fetchUserData();
  }, [auth.currentUser]);

  const fetchEmail = () => {
    const user = auth.currentUser;
    return user.email;
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && auth.currentUser) {
      const storage = getStorage();
      const userRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(userRef);

      // Check if there's an existing profile image and delete it
      if (docSnap.exists() && docSnap.data().profileImageUrl) {
        const oldImageUrl = docSnap.data().profileImageUrl;
        const oldImageRef = ref(storage, oldImageUrl);
        try {
          await deleteObject(oldImageRef);
        } catch (error) {
          console.error("Error deleting old profile image:", error);
        }
      }

      // Continue with uploading the new image
      const storageRef = ref(storage, `profileImages/${auth.currentUser.uid}/${file.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        updateProfileImage(url);
        setImage(url);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const updateProfileImage = async (url) => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);

      try {
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          // Create the document if it doesn't exist
          await setDoc(userRef, { profileImageUrl: url });
        } else {
          // Update the existing document
          await updateDoc(userRef, { profileImageUrl: url });
        }

        setProfileImage(url);
      } catch (error) {
        console.error("Error updating profile image:", error);
      }
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
            Income Graph Type:
            <select className="graph-selection" value={incomeGraphType} onChange={handleIncomeGraphTypeChange}>
              <option value="Doughnut">Doughnut</option>
              <option value="Bar">Bar</option>
              <option value="Line">Line</option>
            </select>
          </label>
          <label className="graph-label">
            Expenses Graph Type:
            <select className="graph-selection" value={outcomeGraphType} onChange={handleOutcomeGraphTypeChange}>
              <option value="Doughnut">Doughnut</option>
              <option value="Bar">Bar</option>
              <option value="Line">Line</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
