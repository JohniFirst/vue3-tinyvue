<template>
  <div class="crop-page">
    <div class="page-header">
      <h2>图片裁剪</h2>
      <p>支持图片裁剪、旋转和缩放功能</p>
    </div>

    <div class="crop-container">
      <div class="crop-controls">
        <tiny-button @click="replaceHandle" type="primary"> 替换图片 </tiny-button>
        <tiny-button text="图片裁剪" @click="visible = !visible" type="success"></tiny-button>
      </div>

      <div class="crop-preview">
        <img :src="imgUrl" alt="预览图片" class="preview-image" />
        <p class="preview-tip">点击"图片裁剪"按钮开始裁剪</p>
      </div>

      <tiny-crop
        ref="cropRef"
        :cropvisible="visible"
        @update:cropvisible="visible = $event"
        :src="imgUrl"
        zoomable
        :rotatable="false"
      ></tiny-crop>
    </div>
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

<style scoped>
.crop-page {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text);
}

.page-header p {
  margin: 0;
  color: var(--color-text-light);
  font-size: 14px;
}

.crop-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.crop-controls {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.crop-preview {
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.preview-image {
  max-width: 100%;
  max-height: 300px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.preview-tip {
  margin: 12px 0 0 0;
  color: var(--color-text-light);
  font-size: 14px;
}
</style>
