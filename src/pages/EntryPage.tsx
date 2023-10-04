// EntryPage.tsx

import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import OrganizationRegistration from '../components/OrganizationRegistration'; // Import the new component
import { useNavigate } from 'react-router-dom';
import './EntryPage.css';

const EntryPage: React.FC = () => {
  console.log("Rendering EntryPage");

  const [showSection, setShowSection] = useState('login'); // using string for better scalability
  const navigate = useNavigate();

  const handleLogin = (token: string) => {
    console.log("Logged in with token:", token);
    navigate('/dashboard');
  };

  const handleSignup = () => {
    console.log("Successfully signed up!");
  };

  return (
    <div className="entry-page">
      <h2>ARCS</h2>
      <div className="toggle-container">
        <button onClick={() => setShowSection('login')} className={showSection === 'login' ? 'active' : ''}>Login</button>
        <button onClick={() => setShowSection('signup')} className={showSection === 'signup' ? 'active' : ''}>Signup</button>
        <button onClick={() => setShowSection('org')} className={showSection === 'org' ? 'active' : ''}>Register Organization</button> {/* Add button for organization registration */}
      </div>
      {showSection === 'login' ? (
        <Login onLogin={handleLogin} />
      ) : showSection === 'signup' ? (
        <Signup onSignup={handleSignup} />
      ) : (
        <OrganizationRegistration /> // Render the new component
      )}
    </div>
  );
}

export default EntryPage;
