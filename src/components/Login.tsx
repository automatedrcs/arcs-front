// components/Login.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../config';
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';
import { Spinner } from "react-bootstrap";

const Login: React.FC = () => {
    const {setUserData} = useUserContext();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const data = {
                username: username,
                password: password
            }
            const response = await axios.post(`${apiUrl}/user/login`, data)
            if (response.status === 200 && response.data.message === "Logged in successfully") {
                setUserData(response.data.userUUID, response.data.organizationId);  // use the correct keys
                navigate('/dashboard');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.detail || 'An error occured')
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3 className="text-black">Login</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        autoComplete="username"
                        className="form-control"
                        aria-describedby="emailHelp"
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        autoComplete="current-password"
                        id="password"
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        {isLoading &&
                        <Spinner
                        as={"span"}
                        animation={"border"}
                        role={"status"}
                        size={"sm"}
                        aria-hidden={"true"}
                        className="me-2"
                        >
                        </Spinner>
                        }
                        {isLoading ? 'Logging in...': 'Login'}
                    </button>
                </div>
            </form>
            <div>
                <a className="btn btn-primary" href="/forgot-password" role="button">Forgot Password?</a>
                <a className="btn btn-primary ms-3" href="/signup" role="button">Sign Up</a>
            </div>
        </div>
    );    
};

export default Login;
