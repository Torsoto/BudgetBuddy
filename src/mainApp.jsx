import { Route, Routes, useLocation } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
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
import { auth, db } from "../firebase/firestore.mjs";
import { getDoc, doc } from "firebase/firestore";
import { GlobalContext } from "./context/GlobalContext.jsx";
import { onAuthStateChanged } from "firebase/auth";

function MainApp() {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/" || location.pathname === "/SignUp";
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false); // Zustand für den Dark Mode hinzufügen
  const { setProfileImage } = useContext(GlobalContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, fetch and set profile image
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists() && docSnap.data().profileImageUrl) {
          setProfileImage(docSnap.data().profileImageUrl);
        }
      } else {
        // User is signed out, clear the profile image
        setProfileImage(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
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
  );
}

export default MainApp;
