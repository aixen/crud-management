<template>
  <div class='container'>
    <h2>Login</h2>
    <form @submit.prevent='login'>
      <input type='email' v-model='email' placeholder='Email' required />
      <input type='password' v-model='password' placeholder='Password' required />
      <button type='submit'>Login</button>
    </form>
  </div>
</template>
<script>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const authStore = useAuthStore();
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const login = async () => {
      await authStore.login({ email: email.value, password: password.value });
      router.push('/profile');
    };
    return { email, password, login };
  }
};
</script>