import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import global from './assets/main.css';
const base = axios.create({
    baseURL: "http://localhost:3000/api"
});
const app = createApp(App)

app.use(router)
app.use(global)
app.config.globalProperties.$http = base;
app.mount('#app')
