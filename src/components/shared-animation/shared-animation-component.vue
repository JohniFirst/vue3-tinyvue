<template>
  <ul>
    <li v-for="item in imageTextList" :key="item.text">
      <img v-lazy="item.image" width="200" height="300" :alt="item.text" />
      <p>{{ item.text }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
const imageTextList = [
  {
    image: 'https://picsum.photos/200/300',
    text: '111',
  },
  {
    image: 'https://picsum.photos/200/300',
    text: '222',
  },
]
</script>
