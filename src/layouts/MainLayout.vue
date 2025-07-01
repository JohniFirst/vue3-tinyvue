<template>
  <div class="main-layout">
    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <h2 v-if="!sidebarCollapsed" class="logo">Vue3 TinyVue</h2>
        <div v-else class="logo-icon">V</div>
      </div>

      <nav class="sidebar-nav">
        <RouterLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: $route.path === item.path }"
        >
          <div class="nav-icon">{{ item.icon }}</div>
          <span v-if="!sidebarCollapsed" class="nav-text">{{ item.name }}</span>
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <button
          @click="toggleSidebar"
          class="sidebar-toggle-btn"
          :title="sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'"
        >
          {{ sidebarCollapsed ? '→' : '←' }}
        </button>
      </div>
    </aside>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 顶部导航栏 -->
      <header class="header">
        <div class="header-left">
          <h1 class="page-title">{{ currentPageTitle }}</h1>
        </div>

        <div class="header-right">
          <!-- 主题切换 -->
          <button
            @click="toggleTheme"
            class="theme-toggle"
            :title="theme === 'light' ? '切换到深色模式' : '切换到浅色模式'"
          >
            {{ theme === 'light' ? '🌙' : '☀️' }}
          </button>

          <!-- 用户信息 -->
          <div class="user-info">
            <img :src="user?.avatar" :alt="user?.username" class="user-avatar" />
            <span class="username">{{ user?.username }}</span>
            <button @click="showLogoutConfirm" class="logout-btn" title="退出登录">🚪</button>
          </div>
        </div>
      </header>

      <!-- 页面内容 -->
      <main class="page-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Modal } from '@opentiny/vue'

const route = useRoute()
const authStore = useAuthStore()

// 响应式数据
const sidebarCollapsed = ref(false)
const theme = ref('light')

// 用户信息
const user = computed(() => authStore.user)

// 菜单项配置
const menuItems = [
  {
    name: '仪表盘',
    path: '/',
    icon: '📊',
  },
  {
    name: '思维导图',
    path: '/mind-map',
    icon: '🧠',
  },
  {
    name: '数据图表',
    path: '/line-chart',
    icon: '📈',
  },
  {
    name: '图片裁剪',
    path: '/crop-view',
    icon: '✂️',
  },
  {
    name: '导航预览',
    path: '/anchor-view',
    icon: '🔗',
  },
]

// 当前页面标题
const currentPageTitle = computed(() => {
  const currentItem = menuItems.find((item) => item.path === route.path)
  return currentItem?.name || '页面'
})

// 切换侧边栏
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// 切换主题
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
  localStorage.setItem('theme', theme.value)
}

// 显示退出确认弹窗
const showLogoutConfirm = () => {
  Modal.confirm({
    title: '确认退出',
    message: '您确定要退出登录吗？',
    confirmButtonText: '确认退出',
    cancelButtonText: '取消',
    type: 'warning',
    onConfirm: () => {
      authStore.logout()
    },
  })
}

onMounted(() => {
  // 初始化主题
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    theme.value = savedTheme
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.value = 'dark'
  }
  document.documentElement.setAttribute('data-theme', theme.value)
})
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 240px;
  background: var(--color-bg-soft);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-primary);
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: var(--color-primary);
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: var(--color-text);
  text-decoration: none;
  transition: all 0.3s ease;
  margin: 4px 8px;
  border-radius: 8px;
}

.nav-item:hover {
  background: var(--color-bg-mute);
  color: var(--color-primary);
}

.nav-item.active {
  background: var(--color-primary);
  color: white;
}

.nav-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 16px;
}

.nav-text {
  margin-left: 12px;
  font-size: 14px;
  font-weight: 500;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: center;
}

.sidebar-toggle-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  color: var(--color-text);
  transition: all 0.3s ease;
  font-size: 16px;
}

.sidebar-toggle-btn:hover {
  background: var(--color-bg-mute);
  color: var(--color-primary);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 60px;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.page-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  color: var(--color-text);
  transition: all 0.3s ease;
  font-size: 18px;
}

.theme-toggle:hover {
  background: var(--color-bg-mute);
  color: var(--color-primary);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-size: 14px;
  color: var(--color-text);
  font-weight: 500;
}

.logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  color: var(--color-text);
  transition: all 0.3s ease;
  font-size: 16px;
}

.logout-btn:hover {
  background: var(--color-bg-mute);
  color: var(--color-danger);
}

.page-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: var(--color-bg);
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar.collapsed {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
  }

  .header {
    padding: 0 16px;
  }

  .page-content {
    padding: 16px;
  }
}
</style>
