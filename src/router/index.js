import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/Auth/AuthView.vue'
import AuthCallback from '@/views/Auth/AuthCallback.vue'
import HomeView from '@/views/Home/HomeView.vue'
import NewsView from '@/views/News/NewsView.vue'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView,
  },
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: AuthCallback,
  },
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/News',
    name: 'NewsView',
    component: NewsView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
