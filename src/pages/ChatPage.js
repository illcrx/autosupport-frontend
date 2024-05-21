import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketService from '../services/socketService';
import { addMessage, setUserInput, clearUserInput } from '../store/chatSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatPage.css';

const ChatPage = () => {
  const userInput = useSelector((state) => state.chat.userInput);
  const chat = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  const [currentSessionId, setCurrentSessionId] = useState(null);

  useEffect(() => {
    console.log('Connecting to WebSocket server...');
    socketService.connect();

    socketService.onReceiveMessage((response) => {
      console.log('Dispatching received message:', response);
      dispatch(addMessage(response));
    });

    // Assume the session ID is obtained from the server or another source
    const fetchSessionId = async () => {
      // Replace with actual session ID fetching logic
      const sessionId = 'session123'; 
      setCurrentSessionId(sessionId);
    };

    fetchSessionId();

    return () => {
      console.log('Disconnecting from WebSocket server...');
      socketService.disconnect();
    };
  }, [dispatch]);

  const handleSendMessage = () => {
    console.log('User input:', userInput);
    if (userInput.trim()) {
      console.log('Sending message:', userInput);
      socketService.sendMessage(userInput, currentSessionId);
      dispatch(addMessage({ content: userInput, sender: localStorage.getItem('username') || 'User' }));
      dispatch(clearUserInput());
    }
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <h2>New Issue</h2>
        <div className="new-issue-buttons">
          <button className="btn btn-primary">Specific Product Service</button>
          <button className="btn btn-primary">Overall Troubleshooting Help</button>
          <button className="btn btn-primary">Setup Help</button>
        </div>
        <hr style={{ backgroundColor: '#fff' }} />
        <h2>Requests</h2>
        {/* Placeholder for requests */}
      </div>
      <div className="chat-main">
        <h2>Chats</h2>
        <div className="chat-window">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === localStorage.getItem('username') ? 'user-message' : 'chatgpt-message'}`}
            >
              <strong>{msg.sender}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
            value={userInput}
            onChange={(e) => {
              console.log('Input change:', e.target.value);
              dispatch(setUserInput(e.target.value));
            }}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
      <div className="photos-files">
        <h2>Photos and Files</h2>
        {/* Placeholder for photos and files */}
      </div>
    </div>
  );
};

export default ChatPage;
