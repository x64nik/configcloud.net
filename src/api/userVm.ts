import apiClient from '@/api/apiClient';

export const userVm = async () => {
  const response = await apiClient.get('/vm/list');
  return response;
};

export const userSSHKeys = async () => {
  const response = await apiClient.get('/keygen/list_keys');
  return response;
};

export const createSSHKey = async () => {
  const response = await apiClient.post('/keygen/generate_key');
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