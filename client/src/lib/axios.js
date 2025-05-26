import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL + "/api";
export const axiosInstance = axios.create({
    baseURL:BACKEND_URL || "http://localhost:3000/api",
    withCredentials:true
});
