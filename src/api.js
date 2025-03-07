import axios from 'axios';

const API_GATEWAY_DOMAIN = import.meta.env.VITE_API_URL;
const api = axios.create({
    baseURL: API_GATEWAY_DOMAIN,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;
