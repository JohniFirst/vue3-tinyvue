<template>
  <ul>
    <li v-for="item in imageTextList" :key="item.text">
      <div class="image-container">
        <img v-lazy="item.image" width="500" height="300" :alt="item.text" class="backup-image" />
        <img
          v-lazy="item.image"
          width="500"
          height="300"
          :alt="item.text"
          :class="{ 'image-expanded': expandedImage === item.image, 'show-image': true }"
          :style="expandedImage === item.image ? expandedStyle : {}"
          @click="handleClick(item, $event)"
        />
      </div>
      <p>{{ item.text }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type ImageText = {
  image: string
  text: string
}

const imageTextList: ImageText[] = [
  {
    image: 'https://www.badwe.com/wp-content/uploads/2022/09/0cf0b6bc39f315cfbddd936883a97d7f.jpg',
    text: '111',
  },
  {
    image: 'https://youimg1.c-ctrip.com/target/100r10000000pycel4E0E.jpg',
    text: '222',
  },
]

const expandedImage = ref<string | null>(null)
const expandedStyle = ref<Record<string, string>>({})

const handleClick = (item: ImageText, event: MouseEvent) => {
  console.log('点击了图片:', item)

  if (expandedImage.value === item.image) {
    // 如果已经展开，则收起
    expandedImage.value = null
    return
  }

  const imgElement = event.target as HTMLImageElement
  const rect = imgElement.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  // 计算图片中心点相对于视口的位置
  const imgCenterX = rect.left + rect.width / 2
  const imgCenterY = rect.top + rect.height / 2

  // 计算屏幕中心点
  const screenCenterX = viewportWidth / 2
  const screenCenterY = viewportHeight / 2

  // 计算需要移动的距离
  const moveX = screenCenterX - imgCenterX
  const moveY = screenCenterY - imgCenterY

  // 设置transform-origin为图片当前位置的中心
  const originX = rect.width / 2 + 'px'
  const originY = rect.height / 2 + 'px'

  expandedStyle.value = {
    transformOrigin: `${originX} ${originY}`,
    transform: `translate(${moveX}px, ${moveY}px) scale(2)`,
    position: 'fixed',
    zIndex: '9999',
    left: rect.left + 'px',
    top: rect.top + 'px',
    width: rect.width + 'px',
    height: rect.height + 'px',
  }

  expandedImage.value = item.image
}
</script>

<style scoped>
.show-image {
  transform-origin: center;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.image-container {
  width: 500px;
  height: 300px;
  position: relative;
}

.backup-image {
  position: absolute;
  z-index: -1;
}

.image-expanded {
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
</style>
