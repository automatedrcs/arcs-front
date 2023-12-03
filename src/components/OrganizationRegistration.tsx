// components/OrganizationRegistration.tsx

import React, { useState } from 'react';
import { apiUrl } from '../config';
import ToastNotification from "./ToastNotification";

const OrganizationRegistration: React.FC = () => {
  const [orgName, setOrgName] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [message, setMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('primary')
  const [showToast, setShowToast] = useState(false)

  const handleToastClose = () => {
    setShowToast(false)
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // setTimeout(() => {
    //   setShowToast(true)
    //   setToastVariant('success')
    //   setMessage('Organization registered successfully!');
    // }, 2000)
    // try {
    //   const response = await fetch(apiUrl + "/organization", {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name: orgName, data: { email: orgEmail } })
    //   });
      
    //   if (response.ok) {
    //     const data = await response.json();
    //     setMessage('Organization registered successfully!');
    //     console.log("response data: ", data);
    //   } else {
    //     const errorData = await response.json();
    //     setMessage(errorData.error || 'Error registering organization.');
    //   }
    // } catch (err) {
    //   console.error("Error registering organization: ", err);
    //   setMessage('An error occurred while registering the organization.');
    // }
  };

  return (
    <div className="container-fluid">
      <h3>Register Organization</h3>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
        <label htmlFor="orgUsername" className="form-label">Username</label>
        <input
          id="orgUsername"
          type="text"
          placeholder="Organization Name"
          value={orgName}
          className="form-control"
          onChange={(e) => setOrgName(e.target.value)}
        />
        </div>
        <label htmlFor="orgEmail" className="form-label">Email</label>
        <div className="mb-3">
          <input
          id="orgEmail"
          type="email"
          placeholder="Organization Email"
          value={orgEmail}
          className="form-control"
          onChange={(e) => setOrgEmail(e.target.value)}
        />
        </div>
      <button className="btn btn-primary" type="submit">Register</button>
      </form>
      <ToastNotification
      show={showToast}
      variant={toastVariant}
      onClose={handleToastClose}
      message={message}
      />
    </div>
  );
};

export default OrganizationRegistration;
