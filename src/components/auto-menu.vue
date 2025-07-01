<template>
  <nav class="auto-menu">
    <ul class="menu-list">
      <li
        v-for="route in menuRoutes"
        :key="route.name"
        class="menu-item"
        :class="{ active: isCurrentRoute(route.path) }"
      >
        <router-link :to="route.path" class="menu-link" :title="route.meta?.title">
          <span class="menu-icon" v-if="route.meta?.icon">
            {{ route.meta.icon }}
          </span>
          <span class="menu-text">{{ route.meta?.title || route.name }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMenuRoutes, useRouteNavigation } from '@/router'

// 使用路由工具
const { getMenuRoutes } = useMenuRoutes()
const { isCurrentRoute } = useRouteNavigation()

// 获取菜单路由
const menuRoutes = computed(() => {
  return getMenuRoutes()
})
</script>

<style scoped>
.auto-menu {
  width: 100%;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  margin: 4px 0;
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #64748b;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.menu-link:hover {
  background-color: rgba(100, 116, 139, 0.1);
  color: #1e293b;
}

.menu-item.active .menu-link {
  background-color: #3b82f6;
  color: white;
}

.menu-icon {
  font-size: 1.2rem;
  width: 20px;
  text-align: center;
}

.menu-text {
  font-weight: 500;
  white-space: nowrap;
}
</style>
