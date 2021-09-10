import { createApp } from 'vue'
import App from './App.vue'
import Home from './views/Home.vue'
import './index.css'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      name: 'Home',
    },
  ],
})

const app = createApp(App)

app.use(router)
app.mount('#app')
