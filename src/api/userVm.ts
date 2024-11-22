import apiClient from '@/api/apiClient';

export const userVm = async () => {
  const response = await apiClient.get('/vm/list');
  return response;
};


type vmData = {
  distro: string;
  vm_name: string;
  cores: number;
  memory: number;
  keypair: string;
}

export const createVm = async (vmMetadata: vmData): Promise<any> => {
    const response = await apiClient.post("/vm/create", vmMetadata);
    return response.data;
};