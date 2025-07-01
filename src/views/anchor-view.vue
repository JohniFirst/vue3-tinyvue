<template>
  <div class="anchor-page">
    <div class="page-header">
      <h2>导航预览</h2>
      <p>自动生成页面导航目录，支持锚点跳转</p>
    </div>

    <div class="anchor-container">
      <div class="content-area">
        <div id="scroll-wp" class="scroll-content">
          <h1>Vue3 开发指南</h1>
          <p>
            Vue3 是一个渐进式的 JavaScript 框架，用于构建用户界面。它提供了响应式数据绑定、
            组件化开发、路由管理等功能，让前端开发变得更加高效和便捷。
          </p>

          <h1>组合式 API</h1>
          <p>
            组合式 API 是 Vue3 中引入的新特性，它提供了一种更灵活的方式来组织组件逻辑。 通过 setup
            函数，我们可以更好地复用逻辑代码，提高代码的可维护性。
          </p>

          <h1>响应式系统</h1>
          <p>
            Vue3 的响应式系统基于 Proxy 实现，提供了更好的性能和更丰富的功能。 通过 ref、reactive 等
            API，我们可以轻松创建响应式数据。
          </p>

          <h1>组件通信</h1>
          <p>
            在 Vue3 中，组件间的通信方式包括 props、emit、provide/inject 等。
            这些方式可以满足不同场景下的组件通信需求。
          </p>

          <h1>路由管理</h1>
          <p>
            Vue Router 4 是 Vue3 的官方路由管理器，提供了声明式路由配置、
            路由守卫、懒加载等功能，让单页应用的开发变得更加简单。
          </p>

          <h1>状态管理</h1>
          <p>
            Pinia 是 Vue3 推荐的状态管理库，它提供了类型安全、开发工具支持、 模块化等特性，是 Vuex
            的现代化替代方案。
          </p>

          <h1>构建工具</h1>
          <p>
            Vite 是 Vue3 生态中的构建工具，它提供了快速的开发服务器、
            热更新、构建优化等功能，大大提升了开发效率。
          </p>

          <h1>测试框架</h1>
          <p>
            Vitest 是专为 Vue3 设计的测试框架，它提供了单元测试、
            组件测试、快照测试等功能，确保代码质量和稳定性。
          </p>
        </div>
      </div>

      <div class="toc-area">
        <AnchorToc targetElement="#scroll-wp" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AnchorToc from '@/components/anchor-toc.vue'
</script>

<style scoped>
.anchor-page {
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

.anchor-container {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;
  min-height: 0;
}

.content-area {
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
}

.scroll-content {
  padding: 24px;
  height: 100%;
  overflow-y: auto;
}

.scroll-content h1 {
  margin: 32px 0 16px 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 8px;
}

.scroll-content h1:first-child {
  margin-top: 0;
}

.scroll-content p {
  margin: 0 0 16px 0;
  line-height: 1.6;
  color: var(--color-text);
}

.toc-area {
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  height: fit-content;
  position: sticky;
  top: 20px;
}

@media (max-width: 768px) {
  .anchor-container {
    grid-template-columns: 1fr;
  }

  .toc-area {
    position: static;
  }
}
</style>
