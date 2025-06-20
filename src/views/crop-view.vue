<template>
  <div>
    <tiny-button @click="replaceHandle" style="margin-bottom: 20px">替换图片</tiny-button>
    <tiny-button
      text="图片裁剪"
      @click="visible = !visible"
      style="margin-bottom: 20px"
    ></tiny-button>
    <tiny-crop
      ref="cropRef"
      :cropvisible="visible"
      @update:cropvisible="visible = $event"
      :src="imgUrl"
      zoomable
      :rotatable="false"
    ></tiny-crop>
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import { TinyCrop, TinyButton } from '@opentiny/vue'

const visible = ref(false)
const cropRef = ref()
const imgUrl = ref(
  `https://res.hc-cdn.com/tiny-vue-web-doc/3.24.0.20250617112121/static/images/mountain.png`,
)

function replaceHandle() {
  cropRef.value.replace(
    `https://res.hc-cdn.com/tiny-vue-web-doc/3.24.0.20250617112121/static/images/bridge.jpg`,
  )
}
</script>
