import apiClient from '@/api/apiClient';

export const userVm = async () => {
  const response = await apiClient('/vm/list');
  return response;
};
