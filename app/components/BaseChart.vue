<template>
  <VChartFull
    :option="options"
    :style="{ height: height ? `${height}px` : '400px' }"
    autoresize
  />
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'

defineProps<{
  options: EChartsOption
  height?: number
}>()
</script> 