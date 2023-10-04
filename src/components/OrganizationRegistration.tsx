// OrganizationRegistration.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { AxiosError } from '../types/axiosTypes';
import { apiUrl } from '../config';

const OrganizationRegistration: React.FC = () => {
  const [orgName, setOrgName] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${apiUrl}/organization/`, {
        name: orgName,
        data: { email: orgEmail }
      });
      setMessage('Organization registered successfully!');
      console.log("response data: ", response.data);
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError && axiosError.response && typeof axiosError.response.data === 'string') {
        setMessage(axiosError.response.data);
        console.error("Error registering organization: ", axiosError.response.data);
      } else if (error instanceof Error) {
        console.error("Error registering organization: ", error.message);
        setMessage('Error registering organization.');
      } else {
        console.error("An unknown error occurred.");
        setMessage('Error registering organization.');
      }
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
      <button onClick={handleRegister}>Register</button>
      {message && <div>{message}</div>}
    </div>
  );
};

export default OrganizationRegistration;
