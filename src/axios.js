import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost', // Replace with your Laravel API base URL
  withCredentials: true, // Important for including credentials in requests
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  // Set Content-Type based on request type
  if (config.data instanceof FormData) {
    // Do not set Content-Type for FormData (let axios handle it)
  } else if (config.data) {
    // Set Content-Type to application/json for other requests
    config.headers['Content-Type'] = 'application/json';
  }

  console.log('Request headers:', config.headers); // Debugging

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
