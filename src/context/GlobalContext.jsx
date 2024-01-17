import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [graphType, setGraphType] = useState('Doughnut');

    return (
        <GlobalContext.Provider value={{ profileImage, setProfileImage, graphType, setGraphType }}>
            {children}
        </GlobalContext.Provider>
    );
};

