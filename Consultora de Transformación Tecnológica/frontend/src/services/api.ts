import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ChatMessageRequest {
  sessionId?: string;
  message: string;
  userEmail?: string;
}

export interface ChatMessageResponse {
  sessionId: string;
  message: string;
  timestamp: string;
}

export interface QuoteRequestData {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry?: string;
  serviceType: string;
  projectDescription: string;
  budgetRange?: string;
}

export const chatApi = {
  sendMessage: async (data: ChatMessageRequest): Promise<ChatMessageResponse> => {
    const response = await api.post<ChatMessageResponse>('/chat/message', data);
    return response.data;
  },
  
  getHistory: async (sessionId: string) => {
    const response = await api.get(`/chat/history/${sessionId}`);
    return response.data;
  },
  
  validateEmail: async (email: string): Promise<boolean> => {
    const response = await api.post<{ valid: boolean }>('/chat/validate-email', { email });
    return response.data.valid;
  },
};

export const quoteApi = {
  submitQuoteRequest: async (data: QuoteRequestData) => {
    const response = await api.post('/quote/request', data);
    return response.data;
  },
};

export default api;
