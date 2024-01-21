import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [incomeGraphType, setIncomeGraphType] = useState('Doughnut');
    const [outcomeGraphType, setOutcomeGraphType] = useState('Doughnut');

    return (
        <GlobalContext.Provider value={{
            profileImage, setProfileImage,
            incomeGraphType, setIncomeGraphType,
            outcomeGraphType, setOutcomeGraphType
        }}>
            {children}
        </GlobalContext.Provider>
    );
};
