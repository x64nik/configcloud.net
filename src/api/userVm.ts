import apiClient from '@/api/apiClient';

export const userVm = async () => {
  const response = await apiClient.get('/vm/list');
  return response;
};

export const userSSHKeys = async () => {
  const response = await apiClient.get('/keygen/list_keys');
  return response;
};


export const createSSHKey = async (keyName: string): Promise<any> => {
  const response = await apiClient.post("/keygen/generate_key", {"keypair_name": keyName}, { responseType: "blob" });
  return response;
};

type vmData = {
  distro?: string;
  vm_name?: string;
  instance_type?: string;
  keypair?: string;
}

export const createVm = async (vmMetadata: vmData): Promise<any> => {
    const response = await apiClient.post("/vm/create", vmMetadata);
    return response;
};