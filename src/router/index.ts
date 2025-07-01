import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DashboardView from '../views/dashboard.vue'
import LoginView from '../views/login-view.vue'
import { MainLayout } from '@/layouts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: '/',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView,
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
        {
          path: '/anchor-view',
          name: 'anchor-view',
          component: () => import('@/views/anchor-view.vue'),
        },
      ],
    },
    // 重定向未匹配的路由到仪表盘
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // 如果路由需要认证
  if (to.meta.requiresAuth !== false) {
    // 检查是否已登录
    if (!authStore.isAuthenticated) {
      // 未登录，重定向到登录页
      next('/login')
      return
    }
  }

  // 如果已登录且访问登录页，重定向到仪表盘
  if (to.path === '/login' && authStore.isAuthenticated) {
    next('/')
    return
  }

  next()
})

export default router
