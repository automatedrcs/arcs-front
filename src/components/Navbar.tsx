// src/components/Navbar.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import LogoutButton from './Logout';
import './Navbar.css';

const Navbar: React.FC = () => {
  const userContext = useContext(UserContext);
  const isLoggedIn = Boolean(userContext?.userUUID);
  console.log("In Navbar");
  console.log("User Context: ", userContext);
  console.log("isLoggedIn: ", isLoggedIn);

  return (
      <nav className="navbar">
          {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
          {isLoggedIn && <LogoutButton />}
      </nav>
  );
};

export default Navbar;