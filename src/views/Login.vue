<template>
    <div class='container form-container'>
        <main class="form-signin">
            <form @submit.prevent='login'>
                <h1 class="h3 mb-3 fw-normal text-center">Authentication</h1>
                <div class="pb-3"> <span class="text-danger"> {{ auth.validationMessage ?? '' }} </span> </div>

                <div class="container p-1">
                    <div class="row">
                        <div class="col p-1 col-md justify-content-md-center">
                            <div class="form-floating">
                                <input
                                    :disabled="auth.isLoading"
                                    class="form-control"
                                    id="floatingInput"
                                    placeholder='Email'
                                    required
                                    type="email"
                                    v-model='email'
                                >
                                <label for="floatingInput">Email address</label>
                            </div>
                            <div class="form-floating">
                                <input
                                    :disabled="auth.isLoading"
                                    class="form-control"
                                    id="floatingPassword"
                                    minlength="6"
                                    placeholder="Password"
                                    required
                                    type="password"
                                    v-model='password'
                                >
                                <label for="floatingPassword">Password</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-8 p-1">
                            <button
                                class="w-100 btn btn-lg btn-outline-dark"
                                type="submit"
                                :disabled="auth.isLoading"
                            >
                                {{ auth.isLoading ? 'Signing in...' : 'Sign In' }}
                            </button>
                        </div>
                        <div class="col-md-4 p-1">
                            <button
                                class="w-100 btn btn-lg btn-outline-dark"
                                type="button"
                                :disabled="auth.isLoading"
                                @click="register"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    </div>
</template>

<style scoped>
.form-container {
    display: flex;
    align-items: center;
    padding: 15%;
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

const auth = useAuthStore();
const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
    await auth.login({ email: email.value, password: password.value });

    if (auth.token) {
        router.push('/dashboard');
    }
};

const register = () => {
    router.push('/register');
};
</script>
