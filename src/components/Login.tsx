// components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../config';

import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const Login: React.FC = () => {
    const userContext = useContext(UserContext);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await fetch(apiUrl + '/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
        
            const data = await response.json();
        
            if (data && data.message === "Logged in successfully") {
                if (userContext) {
                    userContext.setUserData(data.userUUID, data.organizationId);  // use the correct keys
                }
                navigate('/dashboard');
            } else {
                setError(data.error || 'Failed to login');
            }
        } catch (err) {
            setError('An error occurred.');
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="login">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            {loading && <p>Loading...</p>}
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
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={loading}>Login</button>
                </div>
            </form>
            <div>
                <a href="/forgot-password">Forgot Password?</a>
                <a href="/signup">Sign Up</a>
            </div>
        </div>
    );    
};

export default Login;
