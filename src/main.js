import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.css";
import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/main.css';
import { handle } from "./common/promise";
import router from "./router";
import store from "./store";

createApp(App)
    .mixin({
        methods: {
            handle,
        }
    })
    .use(store)
    .use(router)
    .mount('#app');