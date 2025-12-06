// Shared API utilities

export const API_BASE_URL = process.env.API_URL || 'http://localhost:8000/api';

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

export const api = {
  get: (endpoint: string) => apiRequest(endpoint, { method: 'GET' }),
  post: (endpoint: string, data: any) => 
    apiRequest(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint: string, data: any) => 
    apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (endpoint: string) => apiRequest(endpoint, { method: 'DELETE' }),
};

