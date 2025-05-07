import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,  // Django uses `username` for login
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        alert('Login successful!');
        // Navigate to dashboard or resume builder page here
      } else {
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="App">
      <div className="login-box">
        <h2>Login to Resume AI</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email or Username"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p style={{ marginTop: '10px' }}>
          Don't have an account? <a href="#">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default App;
import RegisterForm from './components/RegisterForm';

