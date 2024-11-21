import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config.jsx';
import './loginmodal.css';
import g from '../assets/843776_google_icon.png'

const loginmodal = ({ close }) => {

    const [error, setError] = useState('');


    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            alert('Successfully logged in with Google!');
            close(false); // Close the modal after successful login
            window.location.href = '/sell'; // Redirect to sell page
        } catch (err) {
            setError('Error signing in with Google');
            console.error('Error signing in with Google:', err);
        }
    };


    return (
        <div className='body'>
            <div className='modal'>
                <span className='close' onClick={() => close(false)} >X </span>
                
                <button className='continue-phone' >Continue with Phone</button>
                {error && <p className='error'>{error}</p>}
                <button className='google-login' onClick={handleGoogleLogin}>
                    Sign in with Google <img src={g} alt="" />
                </button>

            </div>
        </div>

    )
}

export default loginmodal