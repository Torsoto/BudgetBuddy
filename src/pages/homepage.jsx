import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepage.css';

const Homepage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="homepage">
            <div className="content">
                <p>BudgetBuddy</p>
                <Link to="/login">
                    <button>Go to Login</button>
                </Link>
            </div>
        </div>
    );
};

export default Homepage;