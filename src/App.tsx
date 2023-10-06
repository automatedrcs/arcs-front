import React, { useContext, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { UserProvider, UserContext } from './contexts/UserContext';
import { apiUrl } from './config';
import EntryPage from './pages/EntryPage';
import DashboardPage from './pages/DashboardPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
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

  const handleAuthCallback = useCallback(async (code: string) => {
    try {
      console.log("handleAuthCallback called with code:", code);
      const response = await fetch(apiUrl + "/authentication/google/callback", {
          method: 'POST',
          body: JSON.stringify({ code }),
          headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      console.log("Received data from callback:", data);
      if (data.error) {
        console.error(data.message);
        return;
      }
      context?.setUserData(data.user.userUUID, data.user.organizationId);
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        context?.setAccessToken(data.token);
      }      
      context?.setCalendarData(data.items);
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  }, [context]);
  console.log("after callback isLoggedIn:", isLoggedIn);

  useEffect(() => {
    if (location.pathname === "/auth/callback") {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      if (code) {
        console.log("Executing authentication callback...");
        handleAuthCallback(code);
      } else {
        console.log("Code not found in /auth/callback URL");
      }
    }
  }, [location, handleAuthCallback]);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <EntryPage />} />
        <Route path="/entry" element={isLoggedIn ? <Navigate to="/dashboard" /> : <EntryPage />} />
        <Route path="/verify/:token" element={<EmailVerificationPage />} />
        <Route path="/dashboard" element={!isLoggedIn ? <Navigate to="/entry" /> : <DashboardPage />} />
      </Routes>
      <TestConnectionButton />
    </>
  );
};

export default App;
