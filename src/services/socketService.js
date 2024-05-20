import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
  }

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

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Disconnected from WebSocket server');
    }
  }

  sendMessage(message) {
    if (this.socket) {
      console.log('Sending message:', message);
      this.socket.emit('sendMessage', message); // Send message as a string
    }
  }

  onReceiveMessage(callback) {
    if (this.socket) {
      this.socket.on('receiveMessage', (response) => {
        console.log('Message received:', response);
        callback(response);
      });
    }
  }
}

const socketService = new SocketService();
export default socketService;
