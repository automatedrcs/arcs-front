import React, { useState } from 'react';

const backendURL = 'https://arcs-back-service-ctl3t7ldeq-uc.a.run.app/user';

export default function UserTests() {
  const [result, setResult] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('testUser');
  const [password, setPassword] = useState<string>('testPassword');
  const [email, setEmail] = useState<string>('test@email.com');
  const [orgId, setOrgId] = useState<number>(1);

  const signupTest = async () => {
    try {
      const response = await fetch(`${backendURL}/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
          email,
          organization_id: orgId
        })
      });

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>User Endpoint Tests</h2>
      
      {/* Inputs to change the test user's data if needed */}
      <div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="number"
          value={orgId}
          onChange={(e) => setOrgId(Number(e.target.value))}
          placeholder="Organization ID"
        />
      </div>

      <button onClick={signupTest}>Signup Test (DB Connection)</button>

      {/* ... Other tests ... */}
      
      <pre>{result}</pre>
    </div>
  );
}

