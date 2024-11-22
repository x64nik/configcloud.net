import apiClient from '@/api/apiClient';


export const listDistros = async () => {
    const response = await apiClient.get('/distros/list');
    return response;
  };
  