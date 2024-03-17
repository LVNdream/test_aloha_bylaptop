import './assets/main.css'

import router from "./routes";
import"bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/js/src/dropdown.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(router).mount('#app')
