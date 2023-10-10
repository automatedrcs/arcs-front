// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import EntryPage from './pages/EntryPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import RequireLogin from './components/RequireLogin';
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
        <Route path="/entry" element={<EntryPage />} />

        {/* Routes Requiring Authentication */}
        <Route path="/" element={<RequireLogin><Navigate to="/dashboard" /></RequireLogin>} />
        <Route path="/dashboard" element={<RequireLogin><DashboardPage /></RequireLogin>} />

        {/* Catch All Route */}
        <Route path="*" element={<Navigate to="/entry" />} />
      </Routes>
      <TestConnectionButton />
    </>
  );
};


export default App;
