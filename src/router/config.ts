import type { AppRouteRecordRaw } from './types'
import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { generateAutoRoutes, getMenuRoutes } from './auto-routes'
import { MainLayout } from '@/layouts'

/**
 * 路由配置
 */
export const routeConfig = {
  // 默认布局
  defaultLayout: MainLayout,

  // 路由分组
  groups: {
    // 认证相关路由
    auth: {
      layout: null, // 无布局
      routes: ['login-view'],
    },

    // 主要功能路由
    main: {
      layout: MainLayout,
      routes: ['dashboard', 'mind-map', 'line-chart', 'crop-view', 'anchor-view'],
    },
  },

  // 路由元信息
  meta: {
    // 全局默认元信息
    global: {
      requiresAuth: true,
      transition: 'page-fade',
      breadcrumb: true,
    },

    // 特定路由元信息
    routes: {
      'login-view': {
        requiresAuth: false,
        transition: 'page-fade',
        hidden: true,
      },
      dashboard: {
        title: '仪表盘',
        icon: 'dashboard',
        order: 1,
      },
      'mind-map': {
        title: '思维导图',
        icon: 'mind-map',
        order: 2,
      },
      'line-chart': {
        title: '折线图',
        icon: 'chart',
        order: 3,
      },
      'crop-view': {
        title: '图片裁剪',
        icon: 'crop',
        order: 4,
      },
      'anchor-view': {
        title: '锚点导航',
        icon: 'anchor',
        order: 5,
      },
    },
  },
}

/**
 * 构建路由配置
 */
export function buildRoutes(): AppRouteRecordRaw[] {
  // 生成自动路由
  const autoRoutes = generateAutoRoutes()

  // 分离认证路由和主要路由
  const authRoutes = autoRoutes.filter((route) => route.name === 'login-view')
  const mainRoutes = autoRoutes.filter((route) => route.name !== 'login-view')

  // 构建最终路由结构
  const routes: AppRouteRecordRaw[] = [
    // 认证路由（无布局）
    ...authRoutes,

    // 主要路由（使用主布局）
    {
      path: '/',
      component: MainLayout,
      meta: {
        requiresAuth: true,
        transition: 'page-fade',
      },
      children: mainRoutes,
    },

    // 404 重定向
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ]

  return routes
}

/**
 * 获取菜单路由
 */
export function getMenuRoutesConfig(): AppRouteRecordRaw[] {
  const routes = generateAutoRoutes()
  return getMenuRoutes(routes)
}

/**
 * 路由权限检查
 */
export function checkRoutePermission(route: AppRouteRecordRaw, isAuthenticated: boolean): boolean {
  // 如果路由不需要认证，直接允许
  if (route.meta?.requiresAuth === false) {
    return true
  }

  // 如果需要认证但用户未登录，拒绝访问
  if (route.meta?.requiresAuth === true && !isAuthenticated) {
    return false
  }

  return true
}

/**
 * 路由导航守卫
 */
export function createRouteGuards(router: Router) {
  router.beforeEach(
    (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      // 这里可以添加更复杂的权限检查逻辑
      // 例如：角色权限、菜单权限等

      next()
    },
  )
}
