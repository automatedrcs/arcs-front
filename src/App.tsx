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
  const location = useLocation();
  const showNavbar = location.pathname !== "/entry";

  const handleAuthCallback = useCallback(async (code: string) => {
    try {
      const response = await fetch(`${apiUrl}/authentication/google/callback`, {
          method: 'POST',
          body: JSON.stringify({ code }),
          headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.error) {
        // Handle error (possibly show a notification or redirect)
        console.error(data.message);
        return;
      }
      context?.setUserData(data.user.userUUID, data.user.organizationId);
      context?.setCalendarData(data.items);
      localStorage.setItem('jwt', data.token);
    } catch (error) {
      console.error('Error during authentication:', error);
      // Handle error (possibly show a notification or redirect)
    }
  }, [context]);

  useEffect(() => {
    if (location.pathname === "/auth/callback") {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      if (code) handleAuthCallback(code);
    }
  }, [location, handleAuthCallback]);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/entry" element={isLoggedIn ? <Navigate to="/dashboard" /> : <EntryPage />} />
        <Route path="/dashboard" element={!isLoggedIn ? <Navigate to="/entry" /> : <DashboardPage />} />
      </Routes>
      <TestConnectionButton />
    </>
  );
};

export default App;
