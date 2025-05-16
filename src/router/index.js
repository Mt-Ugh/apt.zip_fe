import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/Auth/AuthView.vue'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
