import type { RouteRecordRaw } from 'vue-router'
import type { AppRouteRecordRaw, AutoRouteOptions, RouteMeta } from './types'
import type { Component } from 'vue'

// 默认配置
const DEFAULT_OPTIONS: Required<AutoRouteOptions> = {
  viewsDir: 'src/views',
  layoutsDir: 'src/layouts',
  excludePatterns: ['**/*.test.*', '**/*.spec.*', '**/components/**'],
  includePatterns: ['**/*.vue'],
  defaultLayout: 'MainLayout',
  defaultMeta: {
    requiresAuth: true,
    transition: 'page-fade',
    breadcrumb: true,
  },
}

// 使用 import.meta.glob 自动导入所有页面组件
const pageModules = import.meta.glob('@/views/*.vue', { eager: false })

// 路由元信息映射
const ROUTE_META: Record<string, RouteMeta> = {
  dashboard: {
    title: '仪表盘',
    icon: 'dashboard',
    requiresAuth: true,
    transition: 'page-fade',
    order: 1,
  },
  'login-view': {
    title: '登录',
    icon: 'login',
    requiresAuth: false,
    transition: 'page-fade',
    hidden: true,
  },
  'mind-map': {
    title: '思维导图',
    icon: 'mind-map',
    requiresAuth: true,
    transition: 'page-fade',
    order: 2,
  },
  'line-chart': {
    title: '折线图',
    icon: 'chart',
    requiresAuth: true,
    transition: 'page-fade',
    order: 3,
  },
  'crop-view': {
    title: '图片裁剪',
    icon: 'crop',
    requiresAuth: true,
    transition: 'page-fade',
    order: 4,
  },
  'anchor-view': {
    title: '锚点导航',
    icon: 'anchor',
    requiresAuth: true,
    transition: 'page-fade',
    order: 5,
  },
}

/**
 * 从文件路径生成路由名称
 */
function generateRouteName(filePath: string): string {
  return filePath
    .replace(/^\/src\/views\//, '')
    .replace(/\.vue$/, '')
    .replace(/[-_]/g, '-')
    .toLowerCase()
}

/**
 * 从文件路径生成路由路径
 */
function generateRoutePath(filePath: string): string {
  const path = filePath
    .replace(/^\/src\/views\//, '')
    .replace(/\.vue$/, '')
    .replace(/[-_]/g, '-')
    .toLowerCase()

  // 特殊路径处理
  if (path === 'dashboard') return '/'
  if (path === 'login-view') return '/login'

  return `/${path}`
}

/**
 * 生成单个路由
 */
function generateRoute(
  filePath: string,
  component: Component,
  options: Required<AutoRouteOptions>,
): RouteRecordRaw {
  const routeName = generateRouteName(filePath)
  const routePath = generateRoutePath(filePath)
  const meta = { ...options.defaultMeta, ...ROUTE_META[routeName] }

  return {
    path: routePath,
    name: routeName,
    component,
    meta,
  }
}

/**
 * 生成自动路由配置
 */
export function generateAutoRoutes(options: AutoRouteOptions = {}): RouteRecordRaw[] {
  const config = { ...DEFAULT_OPTIONS, ...options }
  const routes: RouteRecordRaw[] = []

  // 遍历所有页面模块
  Object.entries(pageModules).forEach(([filePath, component]) => {
    const route = generateRoute(filePath, component, config)
    routes.push(route)
  })

  // 按 order 排序
  routes.sort((a, b) => {
    const orderA = (a.meta as RouteMeta)?.order || 999
    const orderB = (b.meta as RouteMeta)?.order || 999
    return orderA - orderB
  })

  return routes
}

/**
 * 获取菜单路由（过滤掉隐藏的路由）
 */
export function getMenuRoutes(routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] {
  return routes.filter((route) => !route.meta?.hidden)
}

/**
 * 获取面包屑路由
 */
export function getBreadcrumbRoutes(
  routes: AppRouteRecordRaw[],
  currentPath: string,
): AppRouteRecordRaw[] {
  const breadcrumbRoutes: AppRouteRecordRaw[] = []
  const currentRoute = routes.find((route) => route.path === currentPath)

  while (currentRoute) {
    if (currentRoute.meta?.breadcrumb !== false) {
      breadcrumbRoutes.unshift(currentRoute)
    }
    // 这里可以添加父级路由查找逻辑
    break
  }

  return breadcrumbRoutes
}

/**
 * 验证路由配置
 */
export function validateRoutes(routes: AppRouteRecordRaw[]): string[] {
  const errors: string[] = []
  const routeNames = new Set<string>()
  const routePaths = new Set<string>()

  routes.forEach((route) => {
    // 检查重复的路由名称
    if (route.name && typeof route.name === 'string' && routeNames.has(route.name)) {
      errors.push(`重复的路由名称: ${route.name}`)
    } else if (route.name && typeof route.name === 'string') {
      routeNames.add(route.name)
    }

    // 检查重复的路由路径
    if (routePaths.has(route.path)) {
      errors.push(`重复的路由路径: ${route.path}`)
    } else {
      routePaths.add(route.path)
    }

    // 检查组件是否存在
    if (!route.component) {
      const routeName = typeof route.name === 'string' ? route.name : route.path
      errors.push(`路由 ${routeName} 缺少组件`)
    }
  })

  return errors
}
