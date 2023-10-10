// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import EntryPage from './pages/EntryPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
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
  const location = useLocation();
  const showNavbar = location.pathname !== "/entry";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="*" element={<ProtectedRoute />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/entry" element={<EntryPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      <TestConnectionButton />
    </>
  );
};

export default App;
