import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import NutUI from '@nutui/nutui'
import '@nutui/nutui/dist/style.css'

import './style.css'
import App from './App.vue'
import { routes } from './routes.js'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

createApp(App).use(router).use(NutUI).mount('#app')