import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/firestore.mjs';
import '../styles/login.css';
import googleLogo from '../../public/googlelogo.svg';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import BudgetBuddyLogo from '../assets/BudgetBuddyLogo.jpg'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      console.log('Logged in user:', user);
      navigate("/");
    } catch (error) {
      console.error('Error signing in:', error);
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Logged in user:', user);
      navigate("/");
    } catch (error) {
      console.error('Error signing in:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <img id='bb-logo' src={BudgetBuddyLogo} alt="Budget Buddy Logo" />
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="login-button">Login</button>
          <div className='google-sign-div'>
            <p className="google-signin-text">Login with your Google account
              <img src={googleLogo} alt="Google logo" className="google-logo" onClick={handleGoogleSignIn} />
            </p>
          </div>
          <p className='signup-login-text'>Don't have an account?
            <Link to={"/SignUp"}>
              <a id='signup-link-text' href="/SignUp">Sign up</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;