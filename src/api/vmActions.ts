import apiClient from '@/api/apiClient';




export const vmState = async (vm_id: string, action: string) => {
  const response = await apiClient.post(`/vm/${vm_id}/action/${action}`);
  return response;
};