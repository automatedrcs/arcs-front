import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import SignupPage from './pages/SignupPage/SignupPage';
import Navbar from './components/Navbar/Navbar';
import TestConnectionButton from './components/Test/TestConnectionButton';

import { UserProvider } from './contexts/UserContext';

import './App.css';

const App: React.FC = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <div>
            <Navbar /> {/* <-- Use the Navbar component here */}

            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              {/* ... other routes ... */}
            </Routes>
          </div>
        </Router>
        
        <TestConnectionButton />
      </div>
    </UserProvider>
  );
};

export default App;
