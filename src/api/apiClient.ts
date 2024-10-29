import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// Intercept responses to handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    // If the response is successful, just return the data
    return response.data;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // The request was made, and the server responded with a status code
      console.log('Error response:', error.response);
      const status = error.response.status;
      const errorMessage = error.response.data.message || error.message;
      return Promise.reject(new Error(`${errorMessage}`));
    } else if (error.request) {
      // The request was made but no response was received
      console.log('Error request:', error.request);
      return Promise.reject(new Error('No response from server. Please try again later.'));
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error message:', error.message);
      return Promise.reject(new Error('An unexpected error occurred.')); // Catch-all for unexpected errors
    }
  }
);

export default apiClient;
