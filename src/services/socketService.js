import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.sessionId = null;
  }

  connect(sessionId) {
    this.sessionId = sessionId;
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
      query: { sessionId }, // Pass the session ID as a query parameter
    });
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server with session ID:', sessionId);
    });
    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Disconnected from WebSocket server');
      this.sessionId = null;
    }
  }

  sendMessage(message) {
    const sessionId = localStorage.getItem('sessionId');
    if (this.socket && sessionId) {
      const payload = { message, sessionId };
      console.log('Sending message:', payload);
      this.socket.emit('sendMessage', payload);
    }
  }

  onReceiveMessage(callback) {
    if (this.socket) {
      this.socket.on('receiveMessage', (message) => {
        console.log('Message received:', message);
        callback(message);
      });
    }
  }

  getSessionMessages(sessionId) {
    if (this.socket) {
      console.log('Requesting messages for session:', sessionId);
      this.socket.emit('getSessionMessages', sessionId);
    }
  }

  closeSession(sessionId) {
    if (this.socket) {
      console.log('Closing session:', sessionId);
      this.socket.emit('closeSession', sessionId);
    }
  }

  onReceiveSessionMessages(callback) {
    if (this.socket) {
      this.socket.on('receiveSessionMessages', (response) => {
        console.log('Session messages received:', response);
        callback(response);
      });
    }
  }

  onSessionClosed(callback) {
    if (this.socket) {
      this.socket.on('sessionClosed', (response) => {
        console.log('Session closed:', response);
        callback(response);
      });
    }
  }
}

const socketService = new SocketService();
export default socketService;
