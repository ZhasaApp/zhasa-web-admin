import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import Antd from 'ant-design-vue';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/lib/styles/main.sass'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light'
    }
})

createApp(App).use(router).use(Antd).use(vuetify).mount('#app')
