// pages/EntryPage.tsx

import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import OrganizationRegistration from '../components/OrganizationRegistration'; // Import the new component
import './EntryPage.css';

const EntryPage: React.FC = () => {
  
  const [showSection, setShowSection] = useState('login'); // using string for better scalability
  
  return (
    <div className="container-fluid">
      <div className="btn-group mb-3 mt-3">
        <button onClick={() => setShowSection('login')} className={showSection === 'login' ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'}>Login</button>
        <button onClick={() => setShowSection('signup')} className={showSection === 'signup' ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'}>Signup</button>
        <button onClick={() => setShowSection('org')} className={showSection === 'org' ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'}>Register Organization</button>
      </div>
      {showSection === 'login' ? (
        <Login />
      ) : showSection === 'signup' ? (
        <Signup />
      ) : (
        <OrganizationRegistration /> // Render the new component
      )}
    </div>
  );
}

export default EntryPage;
