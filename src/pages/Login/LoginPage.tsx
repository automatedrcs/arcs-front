import React from 'react';
import Login from '../../components/Login/Login';
import './LoginPage.css';

const LoginPage: React.FC = () => {

  const handleLogin = (token: string) => {
    // Handle post-login logic here
    console.log("Logged in with token:", token);
  };

  return (
    <div className="login-page">
      <h2>ARCS</h2>
      <Login onLogin={handleLogin} />
    </div>
  );
}

export default LoginPage;
