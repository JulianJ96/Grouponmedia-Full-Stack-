import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import App from './App.vue'
import router from './router'
import store from "./auth/store";
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import Vuelidate from 'vuelidate'
import  global from './assets/main.css';

const base = axios.create({
   baseURL: "http://localhost:3000/api"
});

const app = createApp(App)
app.use(global)
app.use(router)
app.use(store)
app.use(VueAxios, axios)
app.use(Vuelidate) 
app.use(VueTelInput);

app.config.globalProperties.$http = base;
app.config.isCustomElement = tag => tag.startsWith('ion-')
app.mount('#app')



