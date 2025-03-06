import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as BootstrapVueNext from 'bootstrap-vue-next';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(BootstrapVueNext);

app.mount('#app');
