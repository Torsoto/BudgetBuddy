// ProfileImageContext.js
import React, { useState, createContext } from 'react';

export const ProfileImageContext = createContext();

export const ProfileImageProvider = ({ children }) => {
    const [profileImage, setProfileImage] = useState(null);

    return (
        <ProfileImageContext.Provider value={{ profileImage, setProfileImage }}>
            {children}
        </ProfileImageContext.Provider>
    );
};
