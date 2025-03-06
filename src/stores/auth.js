import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null
    }),
    actions: {
        async login(credentials) {
            const { data } = await axios.post('/api/user/login', credentials);
            this.token = data.token;
            localStorage.setItem('token', data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            this.user = data.user;
        },
        async register(userData) {
            await axios.post('/api/user/register', userData);
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
    }
});
