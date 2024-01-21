import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [incomeGraphType, setIncomeGraphType] = useState('Doughnut');
    const [outcomeGraphType, setOutcomeGraphType] = useState('Doughnut');
    const [notificationsLimit, setNotificationsLimit] = useState([]);

    return (
        <GlobalContext.Provider value={{
            profileImage, setProfileImage,
            incomeGraphType, setIncomeGraphType,
            outcomeGraphType, setOutcomeGraphType,
            notificationsLimit, setNotificationsLimit
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

