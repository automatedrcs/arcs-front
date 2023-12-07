// src/components/Navbar.tsx
import React from 'react';
import LogoutButton from './Logout';
// import { getUserFromLocalStorage } from '../utils/helpers';
import { useUserContext } from "../contexts/UserContext";

const Navbar: React.FC = () => {
  const { userUUID } = useUserContext()
  const isLoggedIn = userUUID !== null
  
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