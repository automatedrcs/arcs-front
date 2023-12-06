// src/components/Navbar.tsx
import React from 'react';
import LogoutButton from './Logout';
import { getUserFromLocalStorage } from '../utils/helpers';

const Navbar: React.FC = () => {
  const user = getUserFromLocalStorage()
  const isLoggedIn = user !== null
  
  return (
    <nav className="navbar bg-primary">
      <h3 className="text-white ms-2">Welcome to ARCS</h3>
      {/* {isLoggedIn && location.pathname !== '/dashboard' &&
        <Link to="/dashboard">Dashboard</Link>
      } */}
      {isLoggedIn && <LogoutButton />}
    </nav>
  );
};

export default Navbar;