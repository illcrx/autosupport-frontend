import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; // Ensure the CSS file is imported
import socketService from '../services/socketService';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });

      console.log('Response:', response); // Log the entire response for debugging

      if (response.status === 201) {
        const { access_token, sessionId } = response.data;
        localStorage.setItem('jwtToken', access_token);
        localStorage.setItem('sessionId', sessionId); // Store the session ID
        console.log('Token and session ID set:', access_token, sessionId);

        // Initialize the WebSocket connection with the session ID
        socketService.connect(sessionId);

        window.dispatchEvent(new Event('authChange'));
        navigate('/chats'); // Redirect to user profile or desired page
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error.response || error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-header">Login</h2>
        <form onSubmit={handleLogin}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/register">Don't have an account? Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
