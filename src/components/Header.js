import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <nav>
        <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
        {token ? (
          <>
            <Link to="/user-profile" style={{ margin: '0 10px' }}>User Profile</Link>
            <Link to="/admin" style={{ margin: '0 10px' }}>Admin</Link>
            <Link to="/chats" style={{ margin: '0 10px' }}>Chats</Link>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ margin: '0 10px' }}>Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
