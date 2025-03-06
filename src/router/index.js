import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Dashboard from '@/views/components/dashboard/Index.vue';
import Datatable from '@/views/components/dashboard/Datatable.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
        path: '/dashboard',
        redirect: '/dashboard/home',
        component: Dashboard,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: 'home',
                component: Datatable,
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
