import axios from 'axios';
axios.defaults.baseURL = 'https://spacesheep.na4u.ru'

import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import store from './app/store.js'
import router from './router.js'

const app = createApp(App);


app.use(router);
app.use(store);
app.mount('#app');
