// src/components/Logout/Logout.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';

const LogoutButton: React.FC = () => {
  const {logout} = useUserContext();
  const navigate = useNavigate();


  const handleLogout = async () => {
      logout();
      navigate("/entry");
  };

  return <button className='btn btn-danger rounded-button me-3' onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
