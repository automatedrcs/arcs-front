// components/OrganizationRegistration.tsx
import React, { useState } from 'react';
import { apiUrl } from '../config';

const OrganizationRegistration: React.FC = () => {
  const [orgName, setOrgName] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    // Basic validation
    if (!orgName.trim() || !orgEmail.trim()) {
      setMessage('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(apiUrl + "/organization", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: orgName, data: { email: orgEmail } })
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessage('Organization registered successfully!');
        console.log("response data: ", data);
        // Clear fields on successful registration
        setOrgName('');
        setOrgEmail('');
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Error registering organization.');
      }
    } catch (err) {
      console.error("Error registering organization: ", err);
      setMessage('An error occurred while registering the organization.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3>Register Organization</h3>
      <input
        type="text"
        placeholder="Organization Name"
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Organization Email"
        value={orgEmail}
        onChange={(e) => setOrgEmail(e.target.value)}
      />
      <button onClick={handleRegister} disabled={isSubmitting}>
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
      {message && <div>{message}</div>}
    </div>
  );
};

export default OrganizationRegistration;
