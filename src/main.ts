import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import 'virtual:svg-icons-register'

import App from './App.vue'
import router from './router'
import SvgIcon from './components/SvgIcon.vue'

import './style.css'

const app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
