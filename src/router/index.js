import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/Auth/AuthView.vue'
import AuthCallback from '@/views/Auth/AuthCallback.vue'
import HomeView from '@/views/Home/HomeView.vue'
import InterestDeal from '@/views/InterestDeal/InterestDealView.vue'

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
    path: '/interestDeal',
    name: 'InterestDeal',
    component: InterestDeal,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
