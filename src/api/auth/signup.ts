import axios, { AxiosRequestConfig } from 'axios';


const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

const api = axios.create({
    baseURL: API_URL,
});

export const apiRequest = async (endpoint: string, config?: AxiosRequestConfig) => {
    try {
      const response = await api(endpoint, config);
      return response.data;
    } catch (error) {
      // Handle error responses here
      if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message = error.response?.data?.message || error.message;
          
          switch (status) {
              case 400:
                  throw new Error(`${message}`)
              case 401:
                  throw new Error(`${message}`)
              case 403:
                  throw new Error(`${message}`)
              case 404:
                  throw new Error(`${message}`)
              case 500:
                  throw new Error(`${message}`)
              default:
                  throw new Error("An error occurred: Please try again.")
          }
      }
      throw new Error('Unknown error occurred');
    }
  };