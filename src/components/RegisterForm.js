import React, { useState } from 'react';
import RegisterForm from './components/RegisterForm';


function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/api/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Registration successful! You can now log in.');
    } else {
      setMessage(data.username?.[0] || data.email?.[0] || data.password?.[0] || 'Registration failed');
    }
  };

  return (
    <div className="register-box">
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default RegisterForm;
