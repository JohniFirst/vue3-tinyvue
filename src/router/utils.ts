import { useRouter, useRoute, type LocationQueryRaw } from 'vue-router'
import type { AppRouteRecordRaw } from './types'
import { getMenuRoutes, getBreadcrumbRoutes } from './auto-routes'

/**
 * 路由导航工具
 */
export function useRouteNavigation() {
  const router = useRouter()
  const route = useRoute()

  /**
   * 导航到指定路由
   */
  const navigateTo = (path: string, options?: { replace?: boolean; query?: LocationQueryRaw }) => {
    if (options?.replace) {
      router.replace({ path, query: options?.query })
    } else {
      router.push({ path, query: options?.query })
    }
  }

  /**
   * 返回上一页
   */
  const goBack = () => {
    router.back()
  }

  /**
   * 刷新当前页面
   */
  const refresh = () => {
    router.go(0)
  }

  /**
   * 获取当前路由信息
   */
  const getCurrentRoute = () => {
    return route
  }

  /**
   * 检查当前路由是否匹配
   */
  const isCurrentRoute = (path: string) => {
    return route.path === path
  }

  return {
    navigateTo,
    goBack,
    refresh,
    getCurrentRoute,
    isCurrentRoute,
  }
}

/**
 * 路由元信息工具
 */
export function useRouteMeta() {
  const route = useRoute()

  /**
   * 获取路由标题
   */
  const getRouteTitle = () => {
    return route.meta?.title || '页面'
  }

  /**
   * 获取路由图标
   */
  const getRouteIcon = () => {
    return route.meta?.icon || 'default'
  }

  /**
   * 检查路由是否需要认证
   */
  const requiresAuth = () => {
    return route.meta?.requiresAuth !== false
  }

  /**
   * 获取路由过渡动画
   */
  const getRouteTransition = () => {
    return route.meta?.transition || 'page-fade'
  }

  return {
    getRouteTitle,
    getRouteIcon,
    requiresAuth,
    getRouteTransition,
  }
}

/**
 * 菜单路由工具
 */
export function useMenuRoutes() {
  /**
   * 获取菜单路由列表
   */
  const getMenuRoutesList = () => {
    return getMenuRoutes([])
  }

  /**
   * 获取面包屑路由
   */
  const getBreadcrumbs = (currentPath: string) => {
    const routes = getMenuRoutes([])
    return getBreadcrumbRoutes(routes, currentPath)
  }

  /**
   * 过滤隐藏的路由
   */
  const filterHiddenRoutes = (routes: AppRouteRecordRaw[]) => {
    return routes.filter((route) => !route.meta?.hidden)
  }

  /**
   * 按顺序排序路由
   */
  const sortRoutesByOrder = (routes: AppRouteRecordRaw[]) => {
    return routes.sort((a, b) => {
      const orderA = a.meta?.order || 999
      const orderB = b.meta?.order || 999
      return orderA - orderB
    })
  }

  return {
    getMenuRoutes: getMenuRoutesList,
    getBreadcrumbs,
    filterHiddenRoutes,
    sortRoutesByOrder,
  }
}

/**
 * 路由权限工具
 */
export function useRoutePermission() {
  const route = useRoute()

  /**
   * 检查当前路由权限
   */
  const checkCurrentRoutePermission = (isAuthenticated: boolean) => {
    if (route.meta?.requiresAuth === false) {
      return true
    }
    return isAuthenticated
  }

  /**
   * 检查指定路由权限
   */
  const checkRoutePermission = (
    routeMeta: { requiresAuth?: boolean },
    isAuthenticated: boolean,
  ) => {
    if (routeMeta?.requiresAuth === false) {
      return true
    }
    return isAuthenticated
  }

  return {
    checkCurrentRoutePermission,
    checkRoutePermission,
  }
}

/**
 * 路由查询参数工具
 */
export function useRouteQuery() {
  const route = useRoute()
  const router = useRouter()

  /**
   * 获取查询参数
   */
  const getQuery = (key: string) => {
    return route.query[key]
  }

  /**
   * 设置查询参数
   */
  const setQuery = (key: string, value: string | number | boolean) => {
    router.push({
      query: {
        ...route.query,
        [key]: String(value) as string,
      },
    })
  }

  /**
   * 移除查询参数
   */
  const removeQuery = (key: string) => {
    const newQuery = { ...route.query }
    delete newQuery[key]
    router.push({ query: newQuery })
  }

  /**
   * 清空所有查询参数
   */
  const clearQuery = () => {
    router.push({ query: {} })
  }

  return {
    getQuery,
    setQuery,
    removeQuery,
    clearQuery,
  }
}
