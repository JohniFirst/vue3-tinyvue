import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { buildRoutes, checkRoutePermission } from './config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: buildRoutes(),
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated

  // 检查路由权限
  const hasPermission = checkRoutePermission(to, isAuthenticated)

  if (!hasPermission) {
    // 如果没有权限，重定向到登录页
    next('/login')
    return
  }

  // 如果已登录且访问登录页，重定向到仪表盘
  if (to.path === '/login' && isAuthenticated) {
    next('/')
    return
  }

  next()
})

// 导出路由实例
export default router

// 导出路由相关功能
export * from './types'
export * from './auto-routes'
export * from './config'
export * from './utils'
