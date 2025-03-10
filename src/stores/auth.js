import { defineStore } from 'pinia';
import api from '@/api';
import CryptoJS from 'crypto-js';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_SECRET_KEY = import.meta.env.VITE_API_SECRET_KEY;
const ROUTE_PREFIX = import.meta.env.VITE_ROUTE_PREFIX;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.token ?? null,
        isLoading: false,
        validationMessage: null,
        refreshInterval: 0,
    }),

    actions: {
        async login(credentials) {
            this.isLoading = true;
            const hashedBody = this.hashRequestBody(credentials);
            try {
                const { data } = await api.post(`${ROUTE_PREFIX}/login`, credentials, {
                    headers: {
                        'X-SIGNATURE': hashedBody
                    }
                });
                this.user = data.user;
                this.setToken(data.token, data.expires_in);
            } catch (error) {
                this.validationMessage = error?.response?.data?.message;
            } finally {
                this.isLoading = false;
            }
        },

        async register(userData) {
            this.isLoading = true;
            const hashedBody = this.hashRequestBody(userData);
            try {
                const response = await api.post(`${ROUTE_PREFIX}/register`, userData, {
                    headers: {
                        'X-SIGNATURE': hashedBody
                    }
                });
                this.user = response.data.user;
                this.setToken(response.data.token, response.data.expires_in);
            } catch (error) {
                this.validationMessage = error?.response?.data?.message || 'Registration failed';
            } finally {
                this.isLoading = false;
            }
        },

        async getProfile() {
            if (this.user) return Promise.resolve();

            this.isLoading = true;
            try {
                const { data } = await api.get(`${ROUTE_PREFIX}/profile`);
                this.user = data;
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                this.isLoading = false;
            }
        },

        async refreshToken(email) {
            try {
                const { data } = await api.post(`${ROUTE_PREFIX}/refresh`, { email });
                this.setToken(data.token, data.expires_in);
            } catch (error) {
                console.error('Error refreshing token:', error);
                this.logout();
            }
        },

        async logout(router, email) {
            this.clearToken();

            if (router) {
                router.push('/login');
            }

            try {
                const hashedBody = this.hashRequestBody({ email });
                await api.post(`${ROUTE_PREFIX}/logout`, { email }, {
                    headers: {
                        'X-SIGNATURE': hashedBody
                    }
                });
            } catch (error) {
                console.error('Error during logout:', error);
            }
        },

        setToken(token, expiresIn = 3600) {
            const now = Date.now() / 1000;
            const expireAt = now + expiresIn - 300;
            this.token = token;
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            if (this.refreshInterval) {
                clearInterval(this.refreshInterval);
            }

            this.refreshInterval = setInterval(() => {
                if (this.user && Date.now() / 1000 > expireAt) {
                    this.refreshToken({ email: this.user.email });
                }
            }, 30000);
        },

        clearToken() {
            this.token = this.user = this.isLoading = null;
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
            clearInterval(this.refreshInterval);
        },

        initializeAuth() {
            if (this.token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                this.getProfile();
            }
        },

        // HMAC-SHA256 Hashing Function
        hashRequestBody(data) {
            const jsonString = JSON.stringify(data);
            return CryptoJS.HmacSHA256(jsonString, API_SECRET_KEY).toString();
        },
    },

    persist: true
});
