import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import './styles/App.css'
import HomePage from './pages/homepage.jsx'
import Login from './pages/login.jsx'
import SignUp from './pages/SignUp.jsx'
import Settings from './pages/Settings.jsx'
import Entries from './pages/Entries.jsx';
import Account from './pages/Account.jsx';
import BudgetGoals from './pages/BudgetGoals.jsx';



function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Settings" element={<Settings />} />
      <Route path="/Entries" element={<Entries />} />
      <Route path="/Account" element={<Account />} />
      <Route path="/BudgetGoals" element={<BudgetGoals />} />

    </Routes>
  )
}

export default App
