import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import AppLayout from './layouts/AppLayout.vue'
import './index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router).component('AppLayout', AppLayout)

app.mount('#app')
