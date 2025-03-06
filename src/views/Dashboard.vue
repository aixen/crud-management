<template>
  <div class='container'>
    <h2>Profile</h2>
    <p>Name: {{ user?.name }}</p>
    <p>Email: {{ user?.email }}</p>
    <button @click='logout'>Logout</button>
  </div>
</template>
<script>
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    onMounted(() => authStore.getProfile());
    const logout = () => {
      authStore.logout();
      router.push('/login');
    };
    return { user: authStore.user, logout };
  }
};
</script>
