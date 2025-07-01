<template>
  <div class="mind-map-page">
    <div class="page-header">
      <h2>思维导图</h2>
      <p>可视化展示思维结构和知识体系</p>
    </div>

    <div class="mind-map-container">
      <tiny-mind-map ref="mindmap" class="demo-mind-map-event" v-model="exampleData" />
    </div>
  </div>
  <!-- @create="onCreate"
    @operation="onOperation"
    @select-node="onSelectNode"
    @select-new-node="onSelectNewNode"
    @select-nodes="onSelectNodes"
    @unselect-node="onUnselectNode"
    @unselect-nodes="onUnselectNodes"
    @expand-node="onExpandNode" -->
</template>

<script setup lang="ts">
import { TinyMindMap } from '@opentiny/vue'
import { ref } from 'vue'

const exampleData = ref({
  nodeData: {
    id: 'c9ee6647385c42de',
    topic: '前端修仙指南',
    root: true,
    children: [
      {
        topic: 'Handfirst html and css',
        id: 'c9ee977189f3b1f1',
      },
      {
        topic: '高程',
        id: 'c9ee9a4e8f3f83c5',
      },
      {
        topic: 'Javascript 权威指南',
        id: 'c9ee9b8e87958282',
      },
      {
        topic: '算法 第四版',
        id: 'c9eea19c874d331f',
      },
      {
        topic: '大话数据结构',
        id: 'c9eea8d788441a71',
      },
      {
        topic: '算法导论',
        id: 'c9eeac4c84aaba37',
      },
      {
        topic: '编译原理',
        id: 'c9eeadee881cf229',
      },
      {
        topic: '宫水三叶的刷题日记',
        id: 'c9eec88a85d8ff76',
      },
    ],
  },
})
// const onCreate = () => {
//   TinyModal.message({ message: 'create 事件触发了', status: 'info' })
// }
// const onOperation = () => {
//   TinyModal.message({ message: 'operation 事件触发了', status: 'info' })
// }
// const onSelectNode = () => {
//   TinyModal.message({ message: 'selectNode 事件触发了', status: 'info' })
// }
// const onSelectNewNode = () => {
//   TinyModal.message({ message: 'selectNewNode 事件触发了', status: 'info' })
// }
// const onSelectNodes = () => {
//   TinyModal.message({ message: 'selectNodes 事件触发了', status: 'info' })
// }
// const onUnselectNode = () => {
//   TinyModal.message({ message: 'unselectNode 事件触发了', status: 'info' })
// }
// const onUnselectNodes = () => {
//   TinyModal.message({ message: 'unselectNodes 事件触发了', status: 'info' })
// }
// const onExpandNode = () => {
//   TinyModal.message({ message: 'expandNode 事件触发了', status: 'info' })
// }
</script>

<style scoped>
.mind-map-page {
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

.mind-map-container {
  flex: 1;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-bg-soft);
}

.demo-mind-map-event {
  width: 100%;
  height: 100%;
  min-height: 500px;

  :deep(.map-container) {
    .map-canvas {
      background-color: var(--color-bg);
    }
  }
}
</style>
