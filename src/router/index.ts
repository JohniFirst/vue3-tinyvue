import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/vue3-tinyvue'),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login-view.vue'),
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/dashboard.vue'),
        },
        {
          path: '/mind-map',
          name: 'MindMap',
          component: () => import('@/views/mind-map.vue'),
        },
        {
          path: '/line-chart',
          name: 'LineChart',
          component: () => import('@/views/line-chart.vue'),
        },
        {
          path: '/crop-view',
          name: 'CropView',
          component: () => import('@/views/crop-view.vue'),
        },
        {
          path: '/anchor-view',
          name: 'AnchorView',
          component: () => import('@/views/anchor-view.vue'),
        },
      ],
    },
    {
      path: '/shared-animation',
      name: 'SharedAnimation',
      component: () => import('@/views/shared-animation.vue'),
    },
    {
      path: '/seperate-form',
      name: 'SeperateForm',
      component: () => import('@/views/seperate-form/seperate-form.vue'),
    },
  ],
})

export default router
