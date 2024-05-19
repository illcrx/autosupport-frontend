import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwtToken'));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem('jwtToken'));
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
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
