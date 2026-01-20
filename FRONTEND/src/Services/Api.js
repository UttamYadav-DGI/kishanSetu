import axios from "axios";

const api = axios.create({
  baseURL:  import.meta.env.VITE_PRODUCTION==="production" ? import.meta.env.VITE_API_BASE_URL : import.meta.env.VITE_API_BASE_URL_local, 
  withCredentials: true
});

export default api;
