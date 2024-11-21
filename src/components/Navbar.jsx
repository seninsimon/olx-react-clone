import React, { useState, useEffect } from 'react';
import './Navbar.css';
import sell from '../assets/sell.png';
import olx from '../assets/olxlogo.png';
import Loginmodal from './loginmodal';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/config'; // Make sure to import the Firebase auth object
import { signOut } from 'firebase/auth'; // Import signOut method

const Navbar = ({username}) => {
    const [openlogin, setopenlogin] = useState(false);
    const [user, setUser] = useState(null); // State to track the logged-in user

    // Check user authentication status on component mount
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser); // Firebase listener for auth state change
        return () => unsubscribe(); // Cleanup listener when component unmounts
    }, []);

    // Logout function
    const handleLogout = async () => {
        try {
            await signOut(auth); // Firebase sign out
            alert('You have been logged out.');
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };

    return (
        <div className="container">
            <div className="navbar">
                <div className="logo">
                   <Link to='/'>  <img src={olx} alt="" />  </Link> 
                </div>
                <div className="location">
                    <input className="loc" type="text" placeholder="location" />
                </div>
                <div className="searchbar">
                    <input className="searchb" type="text" placeholder="Search" />
                    <button className="search-btn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="white"
                            className="size-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </button>
                </div>
                <div className="language">
                    <span className="lang">{username ? `Welcome ${username}`: "English" }</span>
                </div>
                <div className="login">
                    {!user ? (
                        <span className="log" onClick={() => setopenlogin(!openlogin)}>
                            Login
                        </span>
                    ) : (
                        <span className="log" onClick={handleLogout}>
                            Logout
                        </span>
                    )}
                </div>
                <div className="sell">
                    <button>
                        <Link to="/sell">
                            <img className="sellimage" src={sell} alt="" />
                        </Link>
                    </button>
                </div>
            </div>

            {openlogin && <Loginmodal close={setopenlogin} />}
        </div>
    );
};

export default Navbar;
