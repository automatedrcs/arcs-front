// components/GoogleLogin.tsx

import React from 'react';
import { apiUrl } from '../config';

const GoogleLogin: React.FC = () => {
  const handleLogin = () => {
    // Redirect to Google login endpoint
    window.location.href = apiUrl + "/authentication/google/login";
  };

  return (
    <button onClick={handleLogin}>
      Login with Google
    </button>
  );
};

export default GoogleLogin;
