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
        <div className="container-fluid">
            <h3 className="text-dark">Sign Up</h3>
            {signupSuccess && <p className="success">Signup successful. Redirecting to login...</p>}
            {error && <p className="error">{error}</p>}
            {loading && <p>Loading...</p>}
            {!signupSuccess && (
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="mb-2">
                    <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            value={username}
                            className="form-control"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                    <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-2">
                    <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="mb-2">
                    <label htmlFor="orgEmail" className="form-label">Organizaton email</label>
                        <input
                            type="email"
                            value={orgEmail}
                            className="form-control"
                            onChange={(e) => setOrgEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary" disabled={loading}>Sign Up</button>
                    </div>
                </form>
            )}
            <div className="mt-3">
                <a className="btn btn-primary" href="/login" role="button">Already have an account? Log in</a>
            </div>
        </div>
    );
};

export default Signup;
