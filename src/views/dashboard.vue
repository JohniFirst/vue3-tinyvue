<template>
  <div class="dashboard-page page-component">
    <div class="page-header animated-header">
      <h2 class="title-animation">欢迎回来，{{ user?.username }}！</h2>
      <p class="subtitle-animation">今天是个美好的一天，让我们开始工作吧</p>
    </div>

    <div class="dashboard-grid">
      <div
        class="dashboard-card card-animation"
        v-for="(card, index) in dashboardCards"
        :key="card.title"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="card-icon">{{ card.icon }}</div>
        <div class="card-content">
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
          <RouterLink :to="card.link" class="card-link"> 立即访问 → </RouterLink>
        </div>
      </div>
    </div>

    <div class="quick-stats">
      <div
        class="stat-item stat-animation"
        v-for="(stat, index) in quickStats"
        :key="stat.label"
        :style="{ animationDelay: `${index * 0.2}s` }"
      >
        <div class="stat-number">{{ stat.value }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

defineOptions({ name: 'DashboardView' })

const authStore = useAuthStore()
const user = computed(() => authStore.user)

const dashboardCards = [
  {
    title: '思维导图',
    description: '可视化展示思维结构和知识体系',
    icon: '🧠',
    link: '/mind-map',
  },
  {
    title: '数据图表',
    description: '展示各种数据可视化图表',
    icon: '📈',
    link: '/line-chart',
  },
  {
    title: '图片裁剪',
    description: '支持图片裁剪、旋转和缩放功能',
    icon: '✂️',
    link: '/crop-view',
  },
  {
    title: '导航预览',
    description: '自动生成页面导航目录，支持锚点跳转',
    icon: '🔗',
    link: '/anchor-view',
  },
]

const quickStats = [
  { label: '今日访问', value: '1,234' },
  { label: '活跃用户', value: '567' },
  { label: '完成任务', value: '89' },
  { label: '系统状态', value: '正常' },
]
</script>

<style scoped>
.dashboard-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.page-header {
  text-align: center;
  margin-bottom: 20px;
}

.animated-header {
  animation: slideDown 0.8s ease-out;
}

.title-animation {
  margin: 0 0 12px 0;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleGlow 2s ease-in-out infinite alternate;
}

.subtitle-animation {
  margin: 0;
  font-size: 1.2rem;
  color: #64748b;
  animation: fadeInUp 0.8s ease-out 0.3s both;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.dashboard-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.card-animation {
  animation: cardSlideIn 0.6s ease-out both;
}

.dashboard-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: #667eea;
}

.dashboard-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.5s;
}

.dashboard-card:hover::before {
  left: 100%;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 16px;
  display: block;
  animation: iconBounce 2s ease-in-out infinite;
}

.card-content h3 {
  margin: 0 0 8px 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #1e293b;
}

.card-content p {
  margin: 0 0 16px 0;
  color: #64748b;
  line-height: 1.6;
}

.card-link {
  display: inline-block;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  position: relative;
}

.card-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #667eea;
  transition: width 0.3s;
}

.card-link:hover::after {
  width: 100%;
}

.quick-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  box-shadow:
    0 10px 15px -3px rgba(102, 126, 234, 0.3),
    0 4px 6px -2px rgba(102, 126, 234, 0.1);
  transition: all 0.3s;
}

.stat-animation {
  animation: statSlideIn 0.6s ease-out both;
}

.stat-item:hover {
  transform: translateY(-4px);
  box-shadow:
    0 20px 25px -5px rgba(102, 126, 234, 0.4),
    0 10px 10px -5px rgba(102, 126, 234, 0.2);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-label {
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.9;
}

/* 动画定义 */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes titleGlow {
  from {
    filter: drop-shadow(0 0 5px rgba(102, 126, 234, 0.3));
  }
  to {
    filter: drop-shadow(0 0 15px rgba(102, 126, 234, 0.6));
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes iconBounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes statSlideIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .quick-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .title-animation {
    font-size: 2rem;
  }
}
</style>
