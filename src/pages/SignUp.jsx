import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firestore.mjs';
import '../styles/SignUp.css';
import { useNavigate, Link } from 'react-router-dom';
import BudgetBuddyLogo from '../assets/BudgetBuddyLogo.png'

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleEmailSignUp = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Signed up user:', user);

            // Create a collection for the user in Firestore
            const userCollection = collection(db, 'users');
            const userDocRef = await addDoc(userCollection, {
                uid: user.uid,
                email: user.email,
                // You can add more user-related information if needed
            });

            console.log('User document added to Firestore:', userDocRef.id);

            navigate("/Home");
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="signup-container">
            <img id='bb-logo' src={BudgetBuddyLogo} alt="Budget Buddy Logo" />
            <form onSubmit={handleEmailSignUp} className="signup-form">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="signup-button">Sign Up with Email</button>
            </form>
            <p className='signup-login-text'>Already have an account?
                <Link to={"/"} id='signup-link-text'>
                    Login
                </Link>
            </p>
        </div>
    );
};

export default SignUp;