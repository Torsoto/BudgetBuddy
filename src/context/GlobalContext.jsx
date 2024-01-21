import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [profileImage, setProfileImage] = useState(null);
    const [incomeGraphType, setIncomeGraphType] = useState('Doughnut');
    const [outcomeGraphType, setOutcomeGraphType] = useState('Doughnut');
    const [categoryColors, setCategoryColors] = useState({
        "Salary": "#00FFAD",
        "Food & Drinks": "#E8D603",
        "Entertainment": "#11E803",
        "Groceries": "#D603E8",
        "Utilities": "#8AFF00",
        "Transportation": "#031EE8",
        "Healthcare": "#E80303",
        "Education": "#9103E8",
        "Travel": "#03E8E3",
        "Housing": "#E88803",
        "Shopping": "#03E8E3",
        "Other Expense": "#000000",
    });

    return (
        <GlobalContext.Provider value={{
            profileImage, setProfileImage,
            incomeGraphType, setIncomeGraphType,
            outcomeGraphType, setOutcomeGraphType,
            categoryColors, setCategoryColors,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};
