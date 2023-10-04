import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiUrl } from '../config';

const EmailVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams();  // assuming the route is /verify/:token
  const [status, setStatus] = useState<string>('Verifying...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(apiUrl + '/user/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });

        if (response.ok) {
          setStatus('Email verified successfully!');
          setTimeout(() => navigate('/user/login'), 2000); // redirect to login after 2 seconds
        } else {
          const data = await response.json();
          setStatus(data.error || 'Failed to verify email.');
        }
      } catch (err) {
        setStatus('An error occurred.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{status}</p>
    </div>
  );
};

export default EmailVerificationPage;
