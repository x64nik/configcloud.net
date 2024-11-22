import apiClient from '@/api/apiClient';

export const userVm = async () => {
  const response = await apiClient.get('/vm/list');
  return response;
};


export const createVm = async (vmData: Record<string, any>) => {
    const response = await apiClient.post("/vm/create", vmData);
    return response.data;
};