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
    // Check if there's a response from the server
    if (error.response) {
      // Reject with the backend's full response data as it is
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Reject with a custom message for network errors
      return Promise.reject({ message: 'No response from server. Please try again later.' });
    } else {
      // Reject with a general unexpected error message
      return Promise.reject({ message: 'An unexpected error occurred.' });
    }
  }
);

export default apiClient;
