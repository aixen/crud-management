<template>
  <div class='container'>
    <h2>Register</h2>
    <form @submit.prevent='register'>
      <input type='text' v-model='name' placeholder='Name' required />
      <input type='email' v-model='email' placeholder='Email' required />
      <input type='password' v-model='password' placeholder='Password' required />
      <button type='submit'>Register</button>
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
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const register = async () => {
      await authStore.register({ name: name.value, email: email.value, password: password.value });
      router.push('/login');
    };
    return { name, email, password, register };
  }
};
</script>