import React, { useState } from 'react';

function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call API to authenticate user or handle login logic here
        console.log('Submitted credentials:', credentials);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={credentials.email} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={credentials.password} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

/* 
When the user logs in successfully, save a JWT token either in an httpOnly cookie 
(more secure against XSS attacks) 
or in the local storage 
(less secure, but easier to manage).

Example using local storage

    localStorage.setItem("token", YOUR_JWT_TOKEN);

For any request to your backend where authentication is required, attach the token:

    const token = localStorage.getItem("token");

    fetch("YOUR_BACKEND_API_ENDPOINT", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

*/
export default Login;
