import { io } from 'socket.io-client';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
    this.connect();
  }

  connect() {
    if (this.socket) return;

    this.socket = io('http://localhost:3001', {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.log('WebSocket connection error:', error);
      // Fallback to mock data if connection fails
      this.emit('robot-position', {
        position: { x: 0, y: 0 },
        status: 'idle',
        path: []
      });
    });
  }

  subscribe(event, callback) {
    if (!this.socket) {
      console.warn('WebSocket not connected, reconnecting...');
      this.connect();
    }

    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    this.socket.on(event, callback);
  }

  unsubscribe(event, callback) {
    if (this.socket && this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
      this.socket.off(event, callback);
    }
  }

  emit(event, data) {
    if (!this.socket) {
      console.warn('WebSocket not connected, reconnecting...');
      this.connect();
      return;
    }
    this.socket.emit(event, data);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

// Create and export a singleton instance
const webSocketService = new WebSocketService();
export default webSocketService;