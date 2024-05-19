import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PublicPage1 from './pages/PublicPage1';
import PublicPage2 from './pages/PublicPage2';
import PublicPage3 from './pages/PublicPage3';
import PublicPage4 from './pages/PublicPage4';
import UserProfile from './pages/UserProfile';
import AdminPage from './pages/AdminPage';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/public1" element={<PublicPage1 />} />
        <Route path="/public2" element={<PublicPage2 />} />
        <Route path="/public3" element={<PublicPage3 />} />
        <Route path="/public4" element={<PublicPage4 />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/chats" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
