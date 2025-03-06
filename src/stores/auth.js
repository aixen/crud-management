import { defineStore } from 'pinia';
import api from '@/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        // token: localStorage.getItem('token') || null,
        token: null,
        isLoading: false,
    }),

    actions: {
        async login(credentials) {
            this.isLoading = true;
            try {
                const { data } = await api.post('/api/user/login', credentials);
                this.user = data.user;
                this.token = data.token;

                api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            } catch (error) {
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

        async logout(router) {
            this.isLoading = true;
            try {
                await api.post('/api/user/logout');
            } catch (error) {
                console.error('Error during logout:', error);
            } finally {
                this.token = null;
                this.user = null;
                localStorage.removeItem('token');
                delete api.defaults.headers.common['Authorization'];
                this.isLoading = false;

                if (router) {
                    router.push('/login');
                }
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
