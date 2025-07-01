<template>
  <div class="dashboard">
    <div class="welcome-section">
      <h2>欢迎回来，{{ user?.username }}！</h2>
      <p>今天是 {{ currentDate }}，祝您工作愉快！</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <div class="stat-content">
          <h3>总访问量</h3>
          <p class="stat-number">12,847</p>
          <span class="stat-change positive">+12.5%</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12,6 12,12 16,14"></polyline>
          </svg>
        </div>
        <div class="stat-content">
          <h3>在线时长</h3>
          <p class="stat-number">8.5h</p>
          <span class="stat-change positive">+2.3h</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="m22 21-2-2"></path>
            <path d="M16 16l4 4 4-4"></path>
          </svg>
        </div>
        <div class="stat-content">
          <h3>活跃用户</h3>
          <p class="stat-number">1,234</p>
          <span class="stat-change positive">+5.2%</span>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14,2 14,8 20,8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10,9 9,9 8,9"></polyline>
          </svg>
        </div>
        <div class="stat-content">
          <h3>文档数量</h3>
          <p class="stat-number">456</p>
          <span class="stat-change positive">+8.1%</span>
        </div>
      </div>
    </div>

    <div class="quick-actions">
      <h3>快速操作</h3>
      <div class="actions-grid">
        <RouterLink to="/mind-map" class="action-card">
          <div class="action-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6"></path>
              <path d="M1 12h6m6 0h6"></path>
            </svg>
          </div>
          <h4>思维导图</h4>
          <p>创建和管理思维导图</p>
        </RouterLink>

        <RouterLink to="/line-chart" class="action-card">
          <div class="action-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="3,3 21,3 21,21 3,21 3,3"></polyline>
              <polyline points="7,7 7,17 17,17 17,7"></polyline>
            </svg>
          </div>
          <h4>数据图表</h4>
          <p>查看数据统计图表</p>
        </RouterLink>

        <RouterLink to="/crop-view" class="action-card">
          <div class="action-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M6.13 1L6 16a2 2 0 0 0 2 2h15"></path>
              <path d="M1 6.13L16 6a2 2 0 0 1 2 2v15"></path>
            </svg>
          </div>
          <h4>图片裁剪</h4>
          <p>编辑和裁剪图片</p>
        </RouterLink>

        <RouterLink to="/anchor-view" class="action-card">
          <div class="action-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="8" r="3"></circle>
              <path d="M12 11v10"></path>
              <path d="M8 21h8"></path>
            </svg>
          </div>
          <h4>导航预览</h4>
          <p>查看导航结构</p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const user = computed(() => authStore.user)

const currentDate = computed(() => {
  return new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })
})

defineOptions({ name: 'DashboardView' })
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-section {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  color: white;
  padding: 32px;
  border-radius: 12px;
  margin-bottom: 32px;
  text-align: center;
}

.welcome-section h2 {
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 600;
}

.welcome-section p {
  margin: 0;
  font-size: 16px;
  opacity: 0.9;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: var(--color-primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.stat-content h3 {
  margin: 0 0 4px 0;
  font-size: 14px;
  color: var(--color-text-light);
  font-weight: 500;
}

.stat-number {
  margin: 0 0 4px 0;
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text);
}

.stat-change {
  font-size: 12px;
  font-weight: 500;
}

.stat-change.positive {
  color: #10b981;
}

.quick-actions {
  margin-top: 32px;
}

.quick-actions h3 {
  margin: 0 0 24px 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.action-card {
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px;
  text-decoration: none;
  color: var(--color-text);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: var(--color-primary);
}

.action-icon {
  width: 48px;
  height: 48px;
  background: var(--color-primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 16px;
}

.action-card h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
}

.action-card p {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-light);
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }

  .welcome-section {
    padding: 24px;
  }

  .welcome-section h2 {
    font-size: 24px;
  }
}
</style>
