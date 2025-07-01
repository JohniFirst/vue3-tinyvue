<template>
  <div class="chart-page">
    <div class="page-header">
      <h2>数据图表</h2>
      <p>展示各种数据可视化图表</p>
    </div>

    <div class="charts-container">
      <div class="chart-section">
        <h3>折线图</h3>
        <div class="chart-wrapper">
          <tiny-chart-line :options="options"></tiny-chart-line>
        </div>
      </div>

      <div class="chart-section">
        <h3>饼图</h3>
        <div class="chart-wrapper">
          <tiny-chart-pie :options="pieOptions"></tiny-chart-pie>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  TinyHuichartsLine as TinyChartLine,
  TinyHuichartsPie as TinyChartPie,
} from '@opentiny/vue-huicharts'

const options = ref({
  padding: [50, 30, 50, 20],
  legend: {
    show: true,
    icon: 'line',
  },
  data: [
    { Month: 'Jan', Domestic: 33, Abroad: 1 },
    { Month: 'Feb', Domestic: 27, Abroad: 39 },
    { Month: 'Mar', Domestic: 31, Abroad: 20 },
    { Month: 'Apr', Domestic: 30, Abroad: 15 },
    { Month: 'May', Domestic: 37, Abroad: 1 },
    { Month: 'Jun', Domestic: 36, Abroad: 17 },
    { Month: 'Jul', Domestic: 42, Abroad: 22 },
    { Month: 'Aug', Domestic: 22, Abroad: 12 },
    { Month: 'Sep', Domestic: 17, Abroad: 30 },
    { Month: 'Oct', Domestic: 40, Abroad: 33 },
    { Month: 'Nov', Domestic: 42, Abroad: 22 },
    { Month: 'Dec', Domestic: 32, Abroad: 1 },
  ],
  xAxis: 'Month',
  yAxis: {
    name: 'Percent(%)',
  },
})

const pieOptions = ref({
  type: 'pie',
  selectedMode: 'multipe',
  data: [
    { value: 100, name: 'VPC' },
    { value: 90, name: 'IM' },
    { value: 49, name: 'EIP' },
    { value: 14, name: 'SG' },
  ],
})
</script>

<style scoped>
.chart-page {
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

.charts-container {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.chart-section {
  background: var(--color-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
}

.chart-section h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
}

.chart-wrapper {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .charts-container {
    grid-template-columns: 1fr;
  }
}
</style>
