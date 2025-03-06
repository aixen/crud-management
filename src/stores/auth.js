import { defineStore } from 'pinia';
import api from '@/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        isLoading: false,
        validationMessage: null,
    }),

    actions: {
        async login(credentials) {
            this.isLoading = true;
            this.validationMessage = null;
            try {
                const { data, status } = await api.post('/api/user/login', credentials);
                this.user = data.user;
                this.setToken(data.token, data.expiresIn);

                api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            } catch (error) {
                this.validationMessage = error.response.data.message;
                console.error('Error on login:', error);
            } finally {
                this.isLoading = false;
            }
        },

        async register(userData) {
            this.isLoading = true;
            try {
                await api.post('/api/user/register', userData);
            } catch (error) {
                console.error('Error during registration:', error);
            } finally {
                this.isLoading = false;
            }
        },

        async getProfile() {
            if (this.user) return;

            this.isLoading = true;
            try {
                const { data } = await api.get('/api/user/profile');
                this.user = data;
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                this.isLoading = false;
            }
        },

        async refreshToken() {
            try {
                const { data } = await api.post('/api/user/refresh');
                this.setToken(data.token, data.expires_in);
                console.log('Token refreshed');
            } catch (error) {
                console.error('Error refreshing token:', error);
                this.logout();
            }
        },

        async logout(router) {
            this.isLoading = true;
            try {
                await api.post('/api/user/logout');
            } catch (error) {
                console.error('Error during logout:', error);
            } finally {
                this.clearToken();

                if (router) {
                    router.push('/login');
                }
            }
        },

        setToken(token, expiresIn) {
            this.token = token;
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            if (this.refreshInterval) {
                clearInterval(this.refreshInterval);
            }

            // Set interval to refresh the token before expiration (e.g., 5 minutes before)
            this.refreshInterval = setInterval(() => {
                this.refreshToken();
            }, (expiresIn - 300) * 1000); // Refresh 5 minutes before expiry
        },

        clearToken() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];

            if (this.refreshInterval) {
                clearInterval(this.refreshInterval);
                this.refreshInterval = null;
            }
        },

        initializeAuth() {
            if (this.token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                this.getProfile();
            }
        }
    },

    persist: true
});
