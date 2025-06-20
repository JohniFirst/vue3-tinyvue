import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view.vue'
import LoginView from '../views/login-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/mind-map',
      name: 'mind-map',
      component: () => import('@/views/mind-map.vue'),
    },
    {
      path: '/line-chart',
      name: 'line-chart',
      component: () => import('@/views/line-chart.vue'),
    },
    {
      path: '/crop-view',
      name: 'crop-view',
      component: () => import('@/views/crop-view.vue'),
    },
  ],
})

export default router
