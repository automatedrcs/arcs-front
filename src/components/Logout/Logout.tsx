// src/components/Logout.tsx
import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Logout: React.FC = () => {
  const userContext = useContext(UserContext);

  const handleLogout = () => {
    if (userContext?.logout) {
      userContext.logout();
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
