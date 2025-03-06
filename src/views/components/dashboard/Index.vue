<template>
    <!-- <div class='container'>
        <h2>Profile</h2>
        <p>Name: {{ auth.user?.name }}</p>
        <p>Email: {{ auth.user?.email }}</p>
        <button @click='logout'>Logout</button>
    </div> -->
    <div class="dashboard">
        <!-- Header -->
        <header class="d-flex justify-content-between align-items-center p-3 bg-dark text-white">
            <h4 class="m-0">Dashboard</h4>
            <div class="text-end">
                <span class="mx-3 px-2"> Welcome: {{ auth.user?.name }}</span>
                <button class="btn btn-danger" @click="logout">Logout</button>
            </div>
        </header>

        <div class="d-flex">
            <!-- Sidebar -->
            <sidebar-component />

            <!-- Main Content -->
            <main class="content p-4">
                <router-view />
            </main>
        </div>
    </div>
</template>
<style scoped>
.dashboard {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.sidebar {
    width: 200px;
    height: calc(100vh - 56px);
    position: fixed;
    /* top: 56px; */
    left: 0;
    overflow-y: auto;
}

.content {
    margin-left: 200px;
    width: 100%;
}
</style>
<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import sidebarComponent from '../../components/navigations/sidebar.vue';

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
