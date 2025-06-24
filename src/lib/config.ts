
export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
    retries: parseInt(import.meta.env.VITE_API_RETRIES || '3'),
  },
  socket: {
    url: import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001',
    reconnectAttempts: parseInt(import.meta.env.VITE_SOCKET_RECONNECT_ATTEMPTS || '5'),
    reconnectDelay: parseInt(import.meta.env.VITE_SOCKET_RECONNECT_DELAY || '1000'),
  },
  upload: {
    chunkSize: parseInt(import.meta.env.VITE_UPLOAD_CHUNK_SIZE || '1048576'), // 1MB
    maxConcurrent: parseInt(import.meta.env.VITE_UPLOAD_MAX_CONCURRENT || '3'),
    maxRetries: parseInt(import.meta.env.VITE_UPLOAD_MAX_RETRIES || '3'),
  },
  recording: {
    maxDuration: parseInt(import.meta.env.VITE_RECORDING_MAX_DURATION || '7200'), // 2 hours
    sampleRate: parseInt(import.meta.env.VITE_RECORDING_SAMPLE_RATE || '44100'),
    bitrate: parseInt(import.meta.env.VITE_RECORDING_BITRATE || '128000'),
  },
  features: {
    offlineMode: import.meta.env.VITE_ENABLE_OFFLINE_MODE === 'true',
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    chat: import.meta.env.VITE_ENABLE_CHAT === 'true',
  },
};

export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;
