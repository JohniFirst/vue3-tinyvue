<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const theme = ref('light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
}

// 初始化时根据系统偏好设置主题
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  theme.value = 'dark'
  document.documentElement.setAttribute('data-theme', 'dark')
} else {
  document.documentElement.setAttribute('data-theme', 'light')
}
</script>

<template>
  <button @click="toggleTheme" style="position: fixed; top: 20px; right: 20px; z-index: 999">
    切换{{ theme === 'light' ? '深色' : '浅色' }}模式
  </button>
  <RouterView />
</template>
