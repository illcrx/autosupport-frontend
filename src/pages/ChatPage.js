import React from 'react';

const ChatPage = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '20%', borderRight: '1px solid #ccc' }}>Requests</div>
      <div style={{ width: '60%', borderRight: '1px solid #ccc' }}>Chats</div>
      <div style={{ width: '20%' }}>Photos and Files</div>
    </div>
  );
};

export default ChatPage;
