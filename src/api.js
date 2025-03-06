import axios from 'axios';

const api = axios.create({
    baseURL: 'http://auth.local', // Adjust to your Laravel backend URL
    headers: { 'Content-Type': 'application/json' }
});

export default api;
