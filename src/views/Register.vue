<template>
  <!-- <div class='container'>
    <h2>Register</h2>
    <form @submit.prevent='register'>
      <input type='text' v-model='name' placeholder='Name' required />
      <input type='email' v-model='email' placeholder='Email' required />
      <input type='password' v-model='password' placeholder='Password' required />
      <button type='submit'>Register</button>
    </form>
  </div> -->
    <div class='container form-container'>
        <main class="form-signin">
            <form @submit.prevent='register'>
                <h1 class="h3 mb-3 fw-normal text-center">Registration</h1>
                <div class="container p-1">
                    <div class="row">
                        <div class="col p-1 col-md justify-content-md-center">
                            <div class="form-floating">
                                <input
                                    :disabled="auth.isLoading"
                                    class="form-control"
                                    id="floatingInputName"
                                    placeholder='Name'
                                    required
                                    type="text"
                                    v-model='name'
                                >
                                <label for="floatingInputName">Name</label>
                            </div>
                            <div class="form-floating">
                                <input
                                    :disabled="auth.isLoading"
                                    class="form-control"
                                    id="floatingInputEmail"
                                    placeholder='Email'
                                    required
                                    type="email"
                                    v-model='email'
                                >
                                <label for="floatingInputEmail">Email address</label>
                            </div>
                            <div class="form-floating">
                                <input
                                    :disabled="auth.isLoading"
                                    class="form-control"
                                    id="floatingInputPassword"
                                    minlength="6"
                                    placeholder="Password"
                                    required
                                    type="password"
                                    v-model='password'
                                >
                                <label for="floatingInputPassword">Password</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-8 p-1">
                            <button
                                :disabled="auth.isLoading"
                                class="w-100 btn btn-lg btn-outline-dark"
                                type="submit"
                            >
                                {{ auth.isLoading ? 'Please Wait...' : 'Register' }}
                            </button>
                        </div>
                        <div class="col-md-4 p-1">
                            <button
                                :disabled="auth.isLoading"
                                @click="login"
                                class="w-100 btn btn-lg btn-outline-dark"
                                type="button"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();
const register = async () => {
    await auth.register({
        name: name.value,
        email: email.value,
        password: password.value
    });

    router.push('/login');
};
const login = () => {
    router.push('/login');
};
</script>