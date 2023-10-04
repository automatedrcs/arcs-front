import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useNavigate } from 'react-router-dom';
import './EntryPage.css';

const EntryPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (token: string) => {
    // Handle post-login logic here
    console.log("Logged in with token:", token);
    navigate('/dashboard');
  };

  const handleSignup = () => {
    // Handle post-signup logic here
    console.log("Successfully signed up!");
  };

  return (
    <div className="entry-page">
      <h2>ARCS</h2>
      <div className="toggle-container">
        <button onClick={() => setShowLogin(true)} className={showLogin ? 'active' : ''}>Login</button>
        <button onClick={() => setShowLogin(false)} className={!showLogin ? 'active' : ''}>Signup</button>
      </div>
      {showLogin ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Signup onSignup={handleSignup} />
      )}
    </div>
  );
}

export default EntryPage;
