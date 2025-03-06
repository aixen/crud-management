<template>
    <div class='container'>
        <h2>Profile</h2>
        <p>Name: {{ auth.user?.name }}</p>
        <p>Email: {{ auth.user?.email }}</p>
        <button @click='logout'>Logout</button>
    </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const auth = useAuthStore();
const router = useRouter();

onMounted(() => {
    if (!auth.user) {
        auth.getProfile();
    }
});

const logout = () => {
    try {
        auth.logout(router);
    } catch (error) {
        console.error('Error during logout:', error);
    }
};
</script>
