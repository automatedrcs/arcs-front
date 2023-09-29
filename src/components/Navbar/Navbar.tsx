// src/components/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav>
            <Link to="/dashboard">Dashboard</Link>
        </nav>
    );
};

export default Navbar;
