import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
  }

  // Connect to the WebSocket server
  connect() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'], // Ensures WebSocket transport is used
    });
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }

  // Disconnect from the WebSocket server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Disconnected from WebSocket server');
    }
  }

  // Send message to the WebSocket server
  sendMessage(message, sessionId) {
    if (this.socket) {
      const sessionIDNumeric = sessionId ? parseInt(sessionId, 10) : null; // Ensure sessionId is numeric or null
      const payload = { message, sessionId: sessionIDNumeric }; // Include sessionId in payload
      console.log('Sending message:', payload);
      this.socket.emit('sendMessage', payload);
    }
  }

  // Register a callback to handle received messages
  onReceiveMessage(callback) {
    if (this.socket) {
      this.socket.on('receiveMessage', (message) => {
        console.log('Message received:', message);
        callback(message);
      });
    }
  }
}

const socketService = new SocketService();
export default socketService;
