import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/firestore.mjs'; // adjust the path as needed
import '../styles/login.css'; // adjust the path as needed
import googleLogo from '/googlelogo.svg'; // adjust the path as needed

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
      console.log('Logged in user:', user);
      window.location.href = "/";
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
      window.location.href = "/";
    } catch (error) {
      console.error('Error signing in:', error);
      setError(error.message);
    }
  };

  return (
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
            <img src={googleLogo} alt="Google logo" className="google-logo" onClick={handleGoogleSignIn} /></p>
        </div>
        <p>Don't have an account? <a href="/SignUp">Sign up</a></p>
      </form>
    </div>
  );
};

export default Login;