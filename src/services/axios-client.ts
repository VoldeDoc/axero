import axios from 'axios';

const axiosClient = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://sandbox.thetravelhunters.com',
    timeout: 300000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'TravelHunt-Web-App',
    },
  });

  // Add request interceptor
  instance.interceptors.request.use(
    (config) => {
      console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Add response interceptor
  instance.interceptors.response.use(
    (response) => {
      console.log(` Response from ${response.config.url}:`, response.status);
      
      // Log response structure for debugging
      if (response.data) {
        console.log(' Response data structure:', {
          dataType: typeof response.data,
          isArray: Array.isArray(response.data),
          keys: typeof response.data === 'object' ? Object.keys(response.data) : 'N/A',
          resultsType: response.data.results ? typeof response.data.results : 'N/A',
          resultsIsArray: Array.isArray(response.data.results),
          resultsLength: Array.isArray(response.data.results) ? response.data.results.length : 'N/A',
          firstResultKeys: response.data.results?.[0] ? Object.keys(response.data.results[0]) : 'N/A'
        });
        
        // Log first result sample
        if (response.data.results && response.data.results.length > 0) {
          console.log('📋 First result sample:', response.data.results[0]);
        }
      }
      
      return response;
    },
    (error) => {
      console.error(' API Error:', {
        url: error.config?.url,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        message: error.message
      });
      return Promise.reject(error);
    }
  );

  return instance;
};

export default axiosClient;