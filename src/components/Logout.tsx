// src/components/Logout/Logout.tsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const LogoutButton: React.FC = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();


  const handleLogout = async () => {
      userContext?.logout?.();

      navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
