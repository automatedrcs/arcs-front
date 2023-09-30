import React from 'react';
import Signup from '../../components/Signup/Signup';
import './SignupPage.css';

const SignupPage: React.FC = () => {
  const handleSignup = () => {
    // Handle post-signup logic here, like redirecting to a confirmation page or directly to the dashboard.
    console.log("Successfully signed up!");
  };

  return (
    <div className="signup-page">
      <h2>ARCS</h2>
      <Signup onSignup={handleSignup} />
    </div>
  );
}

export default SignupPage;
