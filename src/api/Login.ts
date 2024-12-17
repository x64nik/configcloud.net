import apiClient from '@/api/apiClient';
import { NextRouter } from 'next/router';


interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const response = await apiClient.post('/auth/login', data); // Flask backend login endpoint
  return response; // Return backend response, could be user info or auth token
};

export const socialLogin = (provider: string) => {
  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // Perform a full redirect to your backend
  window.location.href = `${backendUrl}/auth/login/${provider}`;
};

export const logout = async () => {
  const response = await apiClient.post('/auth/logout');
  return response;
};