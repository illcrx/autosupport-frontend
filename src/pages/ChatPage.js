import React from 'react';

const ChatPage = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f0f0f0', color: '#333' }}>
      <div style={{ width: '20%', padding: '10px', backgroundColor: '#333', color: '#fff' }}>
        <h2 style={{ textAlign: 'center', padding: '10px' }}>Requests</h2>
        {/* Placeholder for requests */}
      </div>
      <div style={{ width: '60%', padding: '10px', backgroundColor: '#555', color: '#fff' }}>
        <h2 style={{ textAlign: 'center', padding: '10px' }}>Chats</h2>
        {/* Placeholder for chats */}
      </div>
      <div style={{ width: '20%', padding: '10px', backgroundColor: '#444', color: '#fff' }}>
        <h2 style={{ textAlign: 'center', padding: '10px' }}>Photos and Files</h2>
        {/* Placeholder for photos and files */}
      </div>
    </div>
  );
};

export default ChatPage;
