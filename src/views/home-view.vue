<template>
  <h1>Hello Vue</h1>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log('Home view mounted');
});
</script>
