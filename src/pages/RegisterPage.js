import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        username,
        password,
        email,
      });

      console.log('Response:', response);

      if (response.status === 201) {
        navigate('/login');
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        setError(error.response.data.message || 'An error occurred. Please try again.');
      } else if (error.request) {
        console.error('Error request:', error.request);
        setError('No response from the server. Please try again.');
      } else {
        console.error('Error message:', error.message);
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-header">Register</h2>
        <form onSubmit={handleRegister}>
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
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/login">Already have an account? Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
