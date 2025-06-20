<template>
  <div class="nav-wp">
    <RouterLink to="/login">登录页面</RouterLink>
    <RouterLink to="/mind-map">思维导图页面</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  console.log('Home view mounted')
})
</script>

<style scoped>
.nav-wp {
  display: flex;
  gap: var(--margin-16);
  flex-wrap: wrap;
  padding: var(--padding-16) var(--padding-24);
}
</style>