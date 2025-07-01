import type { RouteRecordRaw, RouteMeta as VueRouteMeta } from 'vue-router'

// 路由元信息类型
export interface RouteMeta extends VueRouteMeta {
  title?: string
  icon?: string
  requiresAuth?: boolean
  transition?: string
  layout?: string
  hidden?: boolean
  order?: number
  breadcrumb?: boolean
}

// 扩展的路由记录类型
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  meta?: RouteMeta
  children?: AppRouteRecordRaw[]
}

// 页面文件信息
export interface PageFile {
  name: string
  path: string
  fullPath: string
  isDirectory: boolean
  children?: PageFile[]
}

// 路由配置选项
export interface AutoRouteOptions {
  viewsDir?: string
  layoutsDir?: string
  excludePatterns?: string[]
  includePatterns?: string[]
  defaultLayout?: string
  defaultMeta?: Partial<RouteMeta>
}
