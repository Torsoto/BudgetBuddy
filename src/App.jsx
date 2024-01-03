import { Route, Routes } from "react-router-dom";
import './styles/App.css'
import HomePage from './pages/homepage.jsx'
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx'
import Settings from './pages/Settings.jsx'
import Entries from './pages/Entries.jsx';
import BudgetGoals from './pages/BudgetGoals.jsx';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<HomePage />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Settings" element={<Settings />} />
      <Route path="/Entries" element={<Entries />} />
      <Route path="/BudgetGoals" element={<BudgetGoals />} />
    </Routes>
  )
}

export default App
