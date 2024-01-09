import { Route, Routes, useLocation } from "react-router-dom";
import React, { useState } from "react";
import HomePage from "./pages/homepage.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Settings from "./pages/Settings.jsx";
import Entries from "./pages/Entries.jsx";
import BudgetGoals from "./pages/BudgetGoals.jsx";
import TitleBar from "./components/TitleBar.jsx";
import SideBar from "./components/Sidebar.jsx";
import Support from "./pages/Support.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ProfileImageProvider } from "./context/ProfileImageContext";

function MainApp() {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/" || location.pathname === "/SignUp";
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false); // Zustand für den Dark Mode hinzufügen
  const [profilImage, setProfileImage] = useState(null); // Zustand für das Profilbild hinzufügen

  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <ProfileImageProvider>
      <ThemeProvider theme={theme}>
        <div className="mainContainer">
          <TitleBar onToggleSidebar={toggleSidebar} />
          {!hideSidebar && (
            <SideBar className={isSidebarOpen ? "open" : "closed"} />
          )}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Entries" element={<Entries />} />
            <Route path="/BudgetGoals" element={<BudgetGoals />} />
            <Route path="/Support" element={<Support />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ProfileImageProvider>
  );
}

export default MainApp;
