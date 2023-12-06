// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import EntryPage from './pages/EntryPage';
import DashboardPage from './pages/DashboardPage';
import AuthenticationSuccessPage from './pages/AuthenticationSuccessPage';
import AuthenticationErrorPage from './pages/AuthenticationErrorPage';
import Navbar from './components/Navbar';
import RequireLogin from './components/RequireLogin';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
    </QueryClientProvider>
  );
};

const AppContent: React.FC = () => {
  // const location = useLocation();
  // const showNavbar = location.pathname !== "/entry";

  return (
    <>
       <Navbar />
      <Routes>
        <Route path="/entry" element={<EntryPage />} />
        
        {/* Success and Error Routes */}
        <Route path="/authentication-success" element={<AuthenticationSuccessPage />} />
        <Route path="/authentication-error" element={<AuthenticationErrorPage />} />

        {/* Routes Requiring Authentication */}
        <Route path="/" element={<RequireLogin><Navigate to="/dashboard" /></RequireLogin>} />
        <Route path="/dashboard" element={<RequireLogin><DashboardPage /></RequireLogin>} />

        {/* Catch All Route */}
        <Route path="*" element={<Navigate to="/entry" />} />
      </Routes>
    </>
  );
};


export default App;
