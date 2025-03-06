<template>
  <div class='container form-container'>
    <main class="form-signin">
        <form @submit.prevent='login'>
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating">
                <input
                    :disabled="authStore.isLoading"
                    class="form-control"
                    id="floatingInput"
                    placeholder='Email'
                    type="email"
                    v-model='email'
                >
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input
                    :disabled="authStore.isLoading"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    type="password"
                    v-model='password'
                >
                <label for="floatingPassword">Password</label>
            </div>
            <button
                class="w-100 btn btn-lg btn-primary"
                type="submit"
                :disabled="authStore.isLoading"
            >
                {{ authStore.isLoading ? 'Signing in...' : 'Sign In' }}
            </button>
        </form>
    </main>
  </div>
</template>

<style scoped>
.form-container {
    display: flex;
    align-items: center;
}
.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 50px 0;
    margin: auto;
}

.form-signin .checkbox {
    font-weight: 400;
}

.form-signin .form-floating:focus-within {
    z-index: 2;
}

.form-signin input[type="email"] {
    margin-bottom: 0px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
    await authStore.login({ email: email.value, password: password.value });
    if (authStore.token) {
        router.push('/dashboard');
    }
};
</script>
