import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import Antd from 'ant-design-vue';
import {createVuetify} from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

const vuetify = createVuetify()
createApp(App).use(router).use(Antd).use(vuetify).mount('#app')
