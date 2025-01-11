import apiClient from '@/api/apiClient';

export const getVMStats = async (vm_id: string, period: string) => {
  const response = await apiClient.get(`/monitoring/historical/${vm_id}/${period}`);
  return response;
};