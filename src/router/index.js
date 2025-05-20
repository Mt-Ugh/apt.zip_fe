import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/Auth/AuthView.vue'
import AuthCallback from '@/views/Auth/AuthCallback.vue'
import HomeView from '@/views/Home/HomeView.vue'
import QnAView from '@/views/QnA/QnAView.vue'
import QnADetail from '@/views/QnA/QnADetail.vue'
import QnARegist from '@/views/QnA/QnARegist.vue'

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
    path: '/qna',
    name: 'QnAView',
    component: QnAView,
  },
  {
    path: '/qna/detail/:qnaUuid',
    name: 'QnADetail',
    component: QnADetail,
  },
  {
    path: '/qna/regist',
    name: 'QnARegist',
    component: QnARegist,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
