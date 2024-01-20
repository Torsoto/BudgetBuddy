import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from "react-router-dom";
import MainApp from './mainApp.jsx'
import './styles/index.css'
import { GlobalProvider } from "./context/GlobalContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalProvider>
    <HashRouter>
      <MainApp />
    </HashRouter>
  </GlobalProvider>
)