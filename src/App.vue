<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
/* Optional global styles */
</style>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

  onMounted(() => {
      authStore.initializeAuth(); // Fetch profile if user exists
  });
</script>
