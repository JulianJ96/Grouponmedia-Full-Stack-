import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/main.css'
const base = axios.create({
    baseURL: "http://localhost:3000/api"
});
const app = createApp(App)

app.use(router)

app.mount('#app')
