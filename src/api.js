import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_GATEWAY_DOMAIN = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_GATEWAY_DOMAIN,
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
    }
});

export default api;
