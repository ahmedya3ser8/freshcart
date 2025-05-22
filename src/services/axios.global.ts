import axios from "axios";

// Set base URL
axios.defaults.baseURL = 'https://ecommerce.routemisr.com';

// Function to update axios headers
export const updateAxiosHeaders = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['token'] = token;
  } else {
    delete axios.defaults.headers.common['token'];
  }
};

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("userToken");
      if (token) {
        config.headers.token = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login if unauthorized
      if (typeof window !== "undefined") {
        localStorage.removeItem("userToken");
        updateAxiosHeaders(null);
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);