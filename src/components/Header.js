import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import socketService from '../services/socketService';

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  useEffect(() => {
    const handleAuthChange = () => {
      console.log('authChange event received');
      setIsAuthenticated(!!localStorage.getItem('access_token'));
    };

    console.log('Adding authChange event listener');
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      console.log('Removing authChange event listener');
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      localStorage.removeItem('access_token');
      localStorage.removeItem('sessionId');
      socketService.disconnect();
      console.log('Dispatching authChange event');
      window.dispatchEvent(new Event('authChange'));
      navigate('/login');
    }
  };

  return (
    <header style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <nav>
        <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/user-profile" style={{ margin: '0 10px' }}>User Profile</Link>
            <Link to="/admin" style={{ margin: '0 10px' }}>Admin</Link>
            <Link to="/chats" style={{ margin: '0 10px' }}>Chats</Link>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
            <Link to="/register" style={{ margin: '0 10px' }}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
