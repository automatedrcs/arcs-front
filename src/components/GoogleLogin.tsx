import React from 'react';

const GoogleLogin: React.FC = () => {
  const handleLogin = () => {
    // Redirect to your backend's Google login endpoint
    window.location.href = "/authentication/google/login";
  };

  return (
    <button onClick={handleLogin}>
      Login with Google
    </button>
  );
};

export default GoogleLogin;
