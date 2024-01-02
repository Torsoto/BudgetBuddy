import { useState } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import './styles/App.css'
import HomePage from './pages/homepage.jsx'
import Login from './pages/login.jsx'
import SignUp from './pages/SignUp.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
    </Routes>
  )
}

export default App
