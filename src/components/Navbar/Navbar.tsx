// src/components/Navbar.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import LogoutButton from '../Logout/Logout';
import './Navbar.css';

const Navbar: React.FC = () => {
  const userContext = useContext(UserContext);
  const isLoggedIn = Boolean(userContext?.userUUID);

  return (
    <nav className="navbar">
      {!isLoggedIn && <Link to="/login">Login</Link>}
      {!isLoggedIn && <Link to="/signup">Signup</Link>}
      {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
      {isLoggedIn && <LogoutButton />}
    </nav>
  );
};

export default Navbar;