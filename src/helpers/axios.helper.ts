import axios, { AxiosInstance } from "axios";
import useAuthHelpers from "./auth.helper";
import { KEYS } from "./constants.helper";
// const { handleLogout } = useAuthHelpers();

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

request.interceptors.request.use( (config) => {
  const token = localStorage.getItem(KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // handleLogout();
    }
    return Promise.reject(error);
  }
);

export { request };
