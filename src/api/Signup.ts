import apiClient from '@/api/apiClient';

interface SignupData {
    username: string;
    email: string;
    password: string;
}

export const signup = async (data: SignupData) => {
  const response = await apiClient.post('/auth/signup', data); // Flask backend login endpoint
  return response.data; // Return backend response, could be user info or auth token
};
