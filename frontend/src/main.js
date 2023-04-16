import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import global from './assets/main.css';
const base = axios.create({
    baseURL: "http://localhost:3000/api"
});
import VueAxios from 'vue-axios'
import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import Vuelidate from 'vuelidate'
import "bootstrap"
const app = createApp(App)
app.use(router)
app.use(global)
app.config.globalProperties.$http = base;
app.use(VueAxios, axios)
app.use(Vuelidate)
app.use(VueTelInput);
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('ion-')
app.mount('#app')


