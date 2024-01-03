import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import '../styles/SignUp.css';
import { useNavigate, Link } from 'react-router-dom';
import BudgetBuddyLogo from '../assets/BudgetBuddyLogo.jpg'

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const auth = getAuth();

    const handleEmailSignUp = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Signed up user:', user);
            navigate("/Home");
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    /*
    const handleGoogleSignUp = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('Signed up user:', user);
            navigate("/Home");
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };
    */

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