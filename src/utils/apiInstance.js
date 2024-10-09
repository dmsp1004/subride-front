import axios from "axios";

export const API_BASE_URL = "http://localhost:18079";

const apiInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-type": "application/json",
  },
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;