import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface SignUpData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface SignInData {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

// Sign up
export const signUp = async (data: SignUpData): Promise<User> => {
  const response = await axios.post(`${API_URL}/auth/signup`, data);
  return response.data;
};

// Sign in
export const signIn = async (data: SignInData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/auth/signin`, data);
  return response.data;
};

// Get current user
export const getCurrentUser = async (token: string): Promise<User> => {
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Logout
export const logout = async (): Promise<void> => {
  await axios.post(`${API_URL}/auth/logout`);
};

// Save token to localStorage
export const saveToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Get token from localStorage
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Remove token from localStorage
export const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

