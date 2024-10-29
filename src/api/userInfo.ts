import apiClient from '@/api/apiClient';

export const userInfo = async () => {
  const response = await apiClient.get('/user/me');
  return response;
};
