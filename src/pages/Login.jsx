import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase/firestore.mjs';
import { collection, getDocs, where, query, addDoc } from 'firebase/firestore';
import '../styles/login.css';
import { useNavigate, Link } from 'react-router-dom';
import BudgetBuddyLogo from '../assets/BudgetBuddyLogo.png'

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

      // Check if the user has a collection in Firestore
      const userCollectionQuery = query(collection(db, 'users'), where('uid', '==', user.uid));
      const userCollectionSnapshot = await getDocs(userCollectionQuery);

      if (userCollectionSnapshot.empty) {
        console.log('User does not have a collection in Firestore');

        // Create a collection for the user in Firestore
        const userCollection = collection(db, 'users');
        const userDocRef = await addDoc(userCollection, {
          uid: user.uid,
          email: user.email,
          // You can add more user-related information if needed
        });

        console.log('User document added to Firestore:', userDocRef.id);
      } else {
        console.log('User has a collection in Firestore');
      }

      navigate("/Home");
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
          <label htmlFor="username">Email:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="login-button">Login</button>
          <p className='signup-login-text'>Don't have an account?
            <Link to={"/SignUp"} id='signup-link-text'>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;