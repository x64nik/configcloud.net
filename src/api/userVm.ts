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

export const netRules = async(vm_id: string) => {
  const response = await apiClient.get(`/networks/rules/${vm_id}`)
  return response
}

export const netRulesAll = async() => {
  const response = await apiClient.get(`/networks/rules/list`)
  return response
}

type netRuleData = {
  vm_id: string
  protocol: string
  subdomain: string
  domain: string
  internal_ip: string
  internal_port: number
}

export const addNetRule = async(netRuleData: netRuleData) => {
  const response = await apiClient.post("/networks/rules/create", netRuleData)
  return response
}


export const removeNetRule = async(vm_id: string, subdomain: string) => {
  const response = await apiClient.delete(`/networks/rules/delete/${vm_id}/${subdomain}`)
  return response
}


