<template>
  <div>
    <tiny-chart-line :options="options"></tiny-chart-line>

    <tiny-chart-pie :options="pieOptions"></tiny-chart-pie>
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
