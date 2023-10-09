// App.tsx

import React, { useContext, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { UserProvider, UserContext } from './contexts/UserContext';
import { apiUrl } from './config';
import EntryPage from './pages/EntryPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import TestConnectionButton from './components/TestConnectionButton';
import './App.css';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
};

const AppContent: React.FC = () => {
  const context = useContext(UserContext);
  const isLoggedIn = Boolean(context?.userUUID);
  console.log("Beginning isLoggedIn:", isLoggedIn);
  const location = useLocation();
  const showNavbar = location.pathname !== "/entry";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <EntryPage />} />
        <Route path="/entry" element={isLoggedIn ? <Navigate to="/dashboard" /> : <EntryPage />} />
        <Route path="/dashboard" element={!isLoggedIn ? <Navigate to="/entry" /> : <DashboardPage />} />
      </Routes>
      <TestConnectionButton />
    </>
  );
};

export default App;
