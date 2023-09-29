import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import Navbar from './components/Navbar/Navbar';
import TestConnectionButton from './components/Test/TestConnectionButton';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <div>
          <Navbar /> {/* <-- Use the Navbar component here */}

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            {/* ... other routes ... */}
          </Routes>
        </div>
      </Router>
      
      <TestConnectionButton />
    </div>
  );
};

export default App;
