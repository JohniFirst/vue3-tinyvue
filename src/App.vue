<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  // 初始化认证状态
  authStore.initAuth()
})
</script>

<template>
  <div class="app-container">
    <RouterView v-slot="{ Component, route }">
      <transition name="page-fade" mode="out-in" appear>
        <component :is="Component" :key="route.path" />
      </transition>
    </RouterView>
  </div>
</template>

<style>
/* 简约的页面切换动画 */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

/* 应用容器 */
.app-container {
  min-height: 100vh;
}

/* 确保所有页面组件都有基础样式 */
.page-component {
  min-height: 100%;
}

/* 优化动画性能 */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
