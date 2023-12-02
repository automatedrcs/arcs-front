// components/Signup.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../config';

const Signup: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [orgEmail, setOrgEmail] = useState<string>('');
    const [signupSuccess, setSignupSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submit button clicked!");
        setLoading(true);

        try {
            const response = await fetch(apiUrl + '/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, organizationEmail: orgEmail }) // change to organizationEmail
            });            
            if (response.ok) {
                setSignupSuccess(true);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to sign up');
            }
        } catch (err) {
            setError('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup">
            <h2>Sign Up</h2>
            {signupSuccess && <p className="success">Signup successful. Redirecting to login...</p>}
            {error && <p className="error">{error}</p>}
            {loading && <p>Loading...</p>}
            {!signupSuccess && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Organization Email:</label>
                        <input
                            type="email"
                            value={orgEmail}
                            onChange={(e) => setOrgEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" disabled={loading}>Sign Up</button>
                    </div>
                </form>
            )}
            <div>
                <a href="/login">Already have an account? Log in</a>
            </div>
        </div>
    );
};

export default Signup;
