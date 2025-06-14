<template>
  <div ref="chartRef" :style="{ height: `${height}px` }"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  options: EChartsOption
  height?: number
}>()

const chartRef = ref<HTMLElement | null>(null)
let chart: echarts.ECharts | null = null

const initChart = () => {
  if (chartRef.value) {
    chart = echarts.init(chartRef.value)
    chart.setOption(props.options)
  }
}

const updateChart = () => {
  if (chart) {
    chart.setOption(props.options)
  }
}

// Watch for options changes
watch(() => props.options, () => {
  updateChart()
}, { deep: true })

// Handle window resize
const handleResize = () => {
  chart?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  chart?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script> 