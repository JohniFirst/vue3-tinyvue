import type { RouteRecordRaw } from 'vue-router'
import type { RouteMeta } from './types'
import type { Component } from 'vue'

// 使用 import.meta.glob 自动导入所有页面组件
const pageModules = import.meta.glob('@/views/**/*.vue', { eager: false })

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
    .replace(/\//g, '-')
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
 * 获取父级路由路径
 */
function getParentRoutePath(filePath: string): string | null {
  const parts = filePath.split('/')
  if (parts.length > 1) {
    return parts.slice(0, -1).join('/')
  }
  return null
}

/**
 * 生成单个路由
 */
function generateRoute(filePath: string, component: Component): RouteRecordRaw {
  const routeName = generateRouteName(filePath)
  const routePath = generateRoutePath(filePath)
  const meta = { ...ROUTE_META[routeName] }

  return {
    path: routePath,
    name: routeName,
    component,
    meta,
  }
}

/**
 * 构建嵌套路由结构
 */
function buildNestedRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const routeMap = new Map<string, RouteRecordRaw>()
  const nestedRoutes: RouteRecordRaw[] = []

  // 首先创建所有路由的映射
  routes.forEach((route) => {
    routeMap.set(route.path, route)
  })

  // 处理嵌套路由
  routes.forEach((route) => {
    const path = route.path
    const parentPath = getParentRoutePath(path)

    if (parentPath && routeMap.has(parentPath)) {
      const parentRoute = routeMap.get(parentPath)!
      if (!parentRoute.children) {
        parentRoute.children = []
      }
      parentRoute.children.push(route)
    } else {
      nestedRoutes.push(route)
    }
  })

  return nestedRoutes
}

/**
 * 生成高级自动路由配置
 */
export function generateAdvancedAutoRoutes(): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 遍历所有页面模块
  Object.entries(pageModules).forEach(([filePath, component]) => {
    const route = generateRoute(filePath, component)
    routes.push(route)
  })

  // 按 order 排序
  routes.sort((a, b) => {
    const orderA = (a.meta as RouteMeta)?.order || 999
    const orderB = (b.meta as RouteMeta)?.order || 999
    return orderA - orderB
  })

  // 构建嵌套路由结构
  return buildNestedRoutes(routes)
}

/**
 * 获取所有路由的扁平列表
 */
export function getFlatRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const flatRoutes: RouteRecordRaw[] = []

  function flatten(routeList: RouteRecordRaw[]) {
    routeList.forEach((route) => {
      flatRoutes.push(route)
      if (route.children) {
        flatten(route.children)
      }
    })
  }

  flatten(routes)
  return flatRoutes
}

/**
 * 根据路径查找路由
 */
export function findRouteByPath(routes: RouteRecordRaw[], path: string): RouteRecordRaw | null {
  const flatRoutes = getFlatRoutes(routes)
  return flatRoutes.find((route) => route.path === path) || null
}

/**
 * 获取路由面包屑
 */
export function getRouteBreadcrumbs(
  routes: RouteRecordRaw[],
  currentPath: string,
): RouteRecordRaw[] {
  const breadcrumbs: RouteRecordRaw[] = []
  const flatRoutes = getFlatRoutes(routes)

  let currentRoute = flatRoutes.find((route) => route.path === currentPath)

  while (currentRoute) {
    if (currentRoute.meta?.breadcrumb !== false) {
      breadcrumbs.unshift(currentRoute)
    }

    // 查找父级路由
    const parentPath = getParentRoutePath(currentRoute.path)
    currentRoute = parentPath
      ? flatRoutes.find((route) => route.path === `/${parentPath}`)
      : undefined
  }

  return breadcrumbs
}

/**
 * 验证路由配置
 */
export function validateAdvancedRoutes(routes: RouteRecordRaw[]): string[] {
  const errors: string[] = []
  const routeNames = new Set<string>()
  const routePaths = new Set<string>()

  function validateRouteList(routeList: RouteRecordRaw[]) {
    routeList.forEach((route) => {
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

      // 递归检查子路由
      if (route.children) {
        validateRouteList(route.children)
      }
    })
  }

  validateRouteList(routes)
  return errors
}
