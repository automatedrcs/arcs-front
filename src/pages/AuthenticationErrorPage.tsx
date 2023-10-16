import React from 'react';
import { useLocation } from 'react-router-dom';

const AuthenticationErrorPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const detail = params.get('detail');

  return (
    <div>
      <h2>Authentication Error</h2>
      <p>An error occurred during authentication: {detail}</p>
    </div>
  );
};

export default AuthenticationErrorPage;