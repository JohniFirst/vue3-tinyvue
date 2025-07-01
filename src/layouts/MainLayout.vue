<template>
  <div class="main-layout">
    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ 'sidebar-collapsed': isCollapsed }">
      <div class="sidebar-header">
        <div class="logo-container">
          <img src="@/assets/svg/logo.svg" alt="Logo" class="logo" />
          <span class="logo-text" v-show="!isCollapsed">TinyVue</span>
        </div>
        <button @click="toggleSidebar" class="collapse-btn">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M3 12h18M3 6h18M3 18h18"></path>
          </svg>
        </button>
      </div>

      <nav class="sidebar-nav">
        <RouterLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: $route.path === item.path }"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-text" v-show="!isCollapsed">{{ item.name }}</span>
        </RouterLink>
      </nav>
    </aside>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 顶部导航栏 -->
      <header class="header">
        <div class="header-left">
          <h1 class="page-title">{{ currentPageTitle }}</h1>
        </div>

        <div class="header-right">
          <div class="user-info">
            <span class="username">{{ user?.username }}</span>
            <button @click="showLogoutConfirm" class="logout-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16,17 21,12 16,7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              退出登录
            </button>
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
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isCollapsed = ref(false)
const user = computed(() => authStore.user)

const menuItems = [
  { name: '仪表盘', path: '/', icon: '📊' },
  { name: '思维导图', path: '/mind-map', icon: '🧠' },
  { name: '数据图表', path: '/line-chart', icon: '📈' },
  { name: '图片裁剪', path: '/crop-view', icon: '✂️' },
  { name: '导航预览', path: '/anchor-view', icon: '🔗' },
]

const currentPageTitle = computed(() => {
  const currentItem = menuItems.find((item) => item.path === route.path)
  return currentItem?.name || '页面'
})

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const showLogoutConfirm = () => {
  // 使用 TinyModal 显示确认对话框
  const { TinyModal } = window as {
    TinyModal?: {
      confirm: (options: {
        title: string
        message: string
        confirmButtonText: string
        cancelButtonText: string
        onConfirm: () => void
      }) => void
    }
  }
  if (TinyModal) {
    TinyModal.confirm({
      title: '确认退出',
      message: '您确定要退出登录吗？',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      onConfirm: () => {
        authStore.logout()
        router.push('/login')
      },
    })
  } else {
    // 如果没有 TinyModal，使用浏览器原生确认
    if (confirm('您确定要退出登录吗？')) {
      authStore.logout()
      router.push('/login')
    }
  }
}
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  background: #f8fafc;
}

/* 侧边栏样式 */
.sidebar {
  width: 280px;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 100;
}

.sidebar-collapsed {
  width: 80px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 32px;
  height: 32px;
  filter: brightness(0) invert(1);
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  white-space: nowrap;
}

.collapse-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.collapse-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.sidebar-nav {
  padding: 20px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s;
  margin: 4px 12px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.nav-item:hover::before {
  left: 100%;
}

.nav-item:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.nav-item.active {
  color: white;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-icon {
  font-size: 1.2rem;
  min-width: 24px;
  text-align: center;
}

.nav-text {
  font-weight: 500;
  white-space: nowrap;
}

/* 主内容区样式 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.username {
  font-weight: 600;
  color: #64748b;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.logout-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition:
    width 0.3s,
    height 0.3s;
}

.logout-btn:hover::before {
  width: 100%;
  height: 100%;
}

.logout-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.page-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  background: #f8fafc;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    transform: translateX(-100%);
    z-index: 1000;
  }

  .sidebar-collapsed {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
  }

  .header {
    padding: 12px 16px;
  }

  .page-content {
    padding: 16px;
  }
}

/* 动画效果 */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.nav-item {
  animation: slideIn 0.3s ease-out;
}

.nav-item:nth-child(1) {
  animation-delay: 0.1s;
}
.nav-item:nth-child(2) {
  animation-delay: 0.2s;
}
.nav-item:nth-child(3) {
  animation-delay: 0.3s;
}
.nav-item:nth-child(4) {
  animation-delay: 0.4s;
}
.nav-item:nth-child(5) {
  animation-delay: 0.5s;
}
</style>
