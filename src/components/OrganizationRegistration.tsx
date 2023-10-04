// OrganizationRegistration.tsx
import React, { useState } from 'react';
import axios from 'axios'; // assuming you use axios for HTTP requests

const OrganizationRegistration: React.FC = () => {
  const [orgName, setOrgName] = useState('');
  const [data, setData] = useState(''); // for simplicity, using a string here; adapt as required
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/organization/', {
        name: orgName,
        data: data
      });
      setMessage('Organization registered successfully!');
      console.log("response data: ", response);
    } catch (error) {
      setMessage('Error registering organization.');
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
        type="text"
        placeholder="Organization Data"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {message && <div>{message}</div>}
    </div>
  );
};

export default OrganizationRegistration;
