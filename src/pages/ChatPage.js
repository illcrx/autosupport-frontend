import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketService from '../services/socketService';
import { addMessage, setUserInput, clearUserInput } from '../store/chatSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatPage = () => {
  const userInput = useSelector((state) => state.chat.userInput);
  const chat = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Connecting to WebSocket server...');
    socketService.connect();

    socketService.onReceiveMessage((response) => {
      console.log('Dispatching received message:', response);
      dispatch(addMessage(response));
    });

    return () => {
      console.log('Disconnecting from WebSocket server...');
      socketService.disconnect();
    };
  }, [dispatch]);

  const handleSendMessage = () => {
    console.log('User input:', userInput); // Log user input
    if (userInput.trim()) {
      console.log('Sending message:', userInput); // Log message to be sent
      socketService.sendMessage(userInput); // Send message as a string
      dispatch(addMessage({ content: userInput, sender: localStorage.getItem('username') || 'User' }));
      dispatch(clearUserInput());
    }
  };

  return (
    <div className="d-flex" style={{ height: '100vh', backgroundColor: '#f0f0f0', color: '#333' }}>
      <div className="col-2 p-3" style={{ backgroundColor: '#333', color: '#fff' }}>
        <h2 className="text-center p-2">New Issue</h2>
        <div className="d-flex flex-column">
          <button className="btn btn-primary mb-2">Specific Product Service</button>
          <button className="btn btn-primary mb-2">Overall Troubleshooting Help</button>
          <button className="btn btn-primary mb-2">Setup Help</button>
        </div>
        <hr style={{ backgroundColor: '#fff' }} />
        <h2 className="text-center p-2">Requests</h2>
        {/* Placeholder for requests */}
      </div>
      <div className="col-8 p-3" style={{ backgroundColor: '#555', color: '#fff' }}>
        <h2 className="text-center p-2">Chats</h2>
        <div className="chat-window p-3" style={{ height: '80%', overflowY: 'auto', backgroundColor: '#666' }}>
          {chat.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === localStorage.getItem('username') ? 'text-right' : 'text-left'}`}>
              <p className="mb-2 p-2" style={{ backgroundColor: '#444', borderRadius: '5px' }}>
                <strong>{msg.sender}:</strong> {msg.content}
              </p>
            </div>
          ))}
        </div>
        <div className="input-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
            value={userInput}
            onChange={(e) => {
              console.log('Input change:', e.target.value); // Log input changes
              dispatch(setUserInput(e.target.value));
            }}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
      <div className="col-2 p-3" style={{ backgroundColor: '#444', color: '#fff' }}>
        <h2 className="text-center p-2">Photos and Files</h2>
        {/* Placeholder for photos and files */}
      </div>
    </div>
  );
};

export default ChatPage;
