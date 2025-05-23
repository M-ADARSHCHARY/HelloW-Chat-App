import axios from 'axios';

console.log("ENV URL:", import.meta.env.VITE_BACKEND_URL);
export const axiosInstance = axios.create({
    baseURL:import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",
    withCredentials:true
});
