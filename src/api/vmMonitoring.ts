import apiClient from '@/api/apiClient';

export const getVMStats = async (vm_id: string) => {
  const response = await apiClient.get(`/monitoring/historical/102`);
  return response;
};