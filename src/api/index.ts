import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

instance.interceptors.request.use((config) => {
  // Add token if needed
  return config;
});

instance.interceptors.response.use(null, (error) => {
  // Do something with request error
  if (!error.response) {
  }

  if (error.response && error.response.status === 401) {
    localStorage.clear();

    return Promise.reject(error);
  }
  return Promise.reject(error);
});

export default instance;
