
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const API_TIMEOUT = 10000;
const MAX_RETRIES = 3;

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });
          const { token } = response.data;
          localStorage.setItem('auth_token', token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }

    // Retry logic for network errors
    if (error.code === 'NETWORK_ERROR' && originalRequest._retryCount < MAX_RETRIES) {
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      await new Promise(resolve => setTimeout(resolve, 1000 * originalRequest._retryCount));
      return apiClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

// API Methods
export const api = {
  // Authentication
  auth: {
    login: (credentials: { email: string; password: string }) =>
      apiClient.post('/auth/login', credentials),
    register: (userData: { email: string; password: string; name: string }) =>
      apiClient.post('/auth/register', userData),
    logout: () => apiClient.post('/auth/logout'),
    refresh: (refreshToken: string) =>
      apiClient.post('/auth/refresh', { refreshToken }),
  },

  // Recording
  recording: {
    start: (config: { quality: string; format: string }) =>
      apiClient.post('/recording/start', config),
    stop: (sessionId: string) =>
      apiClient.post(`/recording/${sessionId}/stop`),
    pause: (sessionId: string) =>
      apiClient.post(`/recording/${sessionId}/pause`),
    resume: (sessionId: string) =>
      apiClient.post(`/recording/${sessionId}/resume`),
    getStatus: (sessionId: string) =>
      apiClient.get(`/recording/${sessionId}/status`),
  },

  // Transcription
  transcription: {
    getTranscript: (sessionId: string) =>
      apiClient.get(`/transcription/${sessionId}`),
    updateSpeaker: (transcriptId: string, speaker: string) =>
      apiClient.patch(`/transcription/${transcriptId}/speaker`, { speaker }),
  },

  // Chat
  chat: {
    sendMessage: (message: string, context: string) =>
      apiClient.post('/chat/message', { message, context }),
    getHistory: (sessionId: string) =>
      apiClient.get(`/chat/${sessionId}/history`),
  },

  // Analytics
  analytics: {
    getSession: (sessionId: string) =>
      apiClient.get(`/analytics/${sessionId}`),
    getSummary: (sessionId: string) =>
      apiClient.get(`/analytics/${sessionId}/summary`),
    getTopics: (sessionId: string) =>
      apiClient.get(`/analytics/${sessionId}/topics`),
  },

  // File Upload
  upload: {
    chunk: (file: Blob, chunkIndex: number, totalChunks: number, sessionId: string) => {
      const formData = new FormData();
      formData.append('chunk', file);
      formData.append('chunkIndex', chunkIndex.toString());
      formData.append('totalChunks', totalChunks.toString());
      formData.append('sessionId', sessionId);
      
      return apiClient.post('/upload/chunk', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
  },
};
