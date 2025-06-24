
import { io, Socket } from 'socket.io-client';

class SocketClient {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  connect() {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';
    const token = localStorage.getItem('auth_token');

    this.socket = io(socketUrl, {
      auth: { token },
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: this.reconnectDelay,
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected from server:', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.handleReconnection();
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('Reconnected after', attemptNumber, 'attempts');
    });

    this.socket.on('reconnect_failed', () => {
      console.error('Failed to reconnect after maximum attempts');
    });
  }

  private handleReconnection() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        if (this.socket) {
          this.socket.connect();
        }
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  // Recording Events
  onRecordingStatusChange(callback: (status: any) => void) {
    this.socket?.on('recording:status', callback);
  }

  emitStartRecording(config: any) {
    this.socket?.emit('recording:start', config);
  }

  emitStopRecording(sessionId: string) {
    this.socket?.emit('recording:stop', { sessionId });
  }

  emitPauseRecording(sessionId: string) {
    this.socket?.emit('recording:pause', { sessionId });
  }

  emitResumeRecording(sessionId: string) {
    this.socket?.emit('recording:resume', { sessionId });
  }

  // Transcription Events
  onTranscriptionUpdate(callback: (data: any) => void) {
    this.socket?.on('transcription:update', callback);
  }

  onTranscriptionComplete(callback: (data: any) => void) {
    this.socket?.on('transcription:complete', callback);
  }

  // Chat Events
  onChatMessage(callback: (message: any) => void) {
    this.socket?.on('chat:message', callback);
  }

  emitChatMessage(message: string, context: string) {
    this.socket?.emit('chat:send', { message, context });
  }

  // Audio Level Events
  onAudioLevel(callback: (level: number) => void) {
    this.socket?.on('audio:level', callback);
  }

  emitAudioData(audioData: ArrayBuffer) {
    this.socket?.emit('audio:data', audioData);
  }

  // Cleanup
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Utility methods
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export const socketClient = new SocketClient();
