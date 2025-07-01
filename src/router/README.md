# 自动路由系统

这是一个基于文件结构的自动路由系统，可以根据 `src/views` 目录下的 Vue 文件自动生成路由配置。

## 功能特性

- 🚀 **自动路由生成**：根据文件结构自动生成路由配置
- 🔐 **权限控制**：支持路由级别的权限控制
- 🎨 **过渡动画**：支持自定义页面切换动画
- 📱 **响应式菜单**：自动生成导航菜单
- 🧭 **面包屑导航**：自动生成面包屑导航
- 🔧 **类型安全**：完整的 TypeScript 类型支持

## 文件结构

```
src/router/
├── index.ts          # 主路由文件
├── types.ts          # 类型定义
├── auto-routes.ts    # 自动路由生成器
├── config.ts         # 路由配置
├── utils.ts          # 路由工具函数
└── README.md         # 使用说明
```

## 使用方法

### 1. 添加新页面

在 `src/views` 目录下创建新的 Vue 文件，系统会自动生成对应的路由：

```vue
<!-- src/views/user-profile.vue -->
<template>
  <div class="user-profile">
    <h1>用户资料</h1>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑
</script>
```

### 2. 配置路由元信息

在 `src/router/auto-routes.ts` 中的 `ROUTE_META` 对象中添加路由配置：

```typescript
const ROUTE_META: Record<string, RouteMeta> = {
  'user-profile': {
    title: '用户资料',
    icon: 'user',
    requiresAuth: true,
    transition: 'page-fade',
    order: 6,
  },
}
```

### 3. 使用路由工具

```typescript
import { useRouteNavigation, useRouteMeta, useMenuRoutes } from '@/router'

// 路由导航
const { navigateTo, goBack } = useRouteNavigation()
navigateTo('/user-profile')

// 路由元信息
const { getRouteTitle, getRouteIcon } = useRouteMeta()
const title = getRouteTitle()

// 菜单路由
const { getMenuRoutes } = useMenuRoutes()
const menuRoutes = getMenuRoutes()
```

### 4. 在组件中使用

```vue
<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <nav>
      <router-link v-for="route in menuRoutes" :key="route.name" :to="route.path">
        {{ route.meta?.title }}
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouteMeta, useMenuRoutes } from '@/router'

const { getRouteTitle } = useRouteMeta()
const { getMenuRoutes } = useMenuRoutes()

const pageTitle = computed(() => getRouteTitle())
const menuRoutes = computed(() => getMenuRoutes())
</script>
```

## 配置选项

### 路由元信息

```typescript
interface RouteMeta {
  title?: string // 页面标题
  icon?: string // 图标
  requiresAuth?: boolean // 是否需要认证
  transition?: string // 过渡动画
  layout?: string // 布局组件
  hidden?: boolean // 是否在菜单中隐藏
  order?: number // 排序
  breadcrumb?: boolean // 是否显示面包屑
}
```

### 自动路由选项

```typescript
interface AutoRouteOptions {
  viewsDir?: string // 视图目录
  layoutsDir?: string // 布局目录
  excludePatterns?: string[] // 排除模式
  includePatterns?: string[] // 包含模式
  defaultLayout?: string // 默认布局
  defaultMeta?: Partial<RouteMeta> // 默认元信息
}
```

## 高级功能

### 1. 路由权限控制

```typescript
import { checkRoutePermission } from '@/router'

const hasPermission = checkRoutePermission(route, isAuthenticated)
```

### 2. 面包屑导航

```typescript
import { useMenuRoutes } from '@/router'

const { getBreadcrumbs } = useMenuRoutes()
const breadcrumbs = getBreadcrumbs('/user/profile')
```

### 3. 查询参数管理

```typescript
import { useRouteQuery } from '@/router'

const { getQuery, setQuery, removeQuery } = useRouteQuery()

// 获取查询参数
const userId = getQuery('userId')

// 设置查询参数
setQuery('page', 1)

// 移除查询参数
removeQuery('filter')
```

## 最佳实践

1. **文件命名**：使用 kebab-case 命名 Vue 文件
2. **路由配置**：在 `ROUTE_META` 中配置所有路由元信息
3. **权限控制**：使用 `requiresAuth` 控制路由访问权限
4. **类型安全**：充分利用 TypeScript 类型检查
5. **性能优化**：使用异步组件导入页面组件

## 扩展功能

### 添加新的路由类型

1. 在 `types.ts` 中定义新的类型
2. 在 `auto-routes.ts` 中添加生成逻辑
3. 在 `config.ts` 中配置路由结构

### 自定义路由生成规则

修改 `auto-routes.ts` 中的生成函数来自定义路由生成规则。

## 故障排除

### 路由不生效

1. 检查文件是否在 `src/views` 目录下
2. 确认文件名格式正确
3. 检查 `ROUTE_META` 配置

### 权限问题

1. 检查 `requiresAuth` 配置
2. 确认认证状态正确
3. 查看路由守卫逻辑

### 类型错误

1. 确保导入正确的类型
2. 检查 TypeScript 配置
3. 更新类型定义
