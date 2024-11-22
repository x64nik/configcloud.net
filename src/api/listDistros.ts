import apiClient from '@/api/apiClient';


export const listDistros = async () => {
    const response = await apiClient.get('/distros/list');
    return response;
  };
  

export const listInstances = async () => {
  const response = await apiClient.get('/distros/instances');
  return response;
};