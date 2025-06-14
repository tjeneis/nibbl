<template>
  <VCard>
    <VCardTitle>Weight Trend</VCardTitle>
    <VCardText>
      <BaseChart
        v-if="entries.length > 0"
        :options="chartOptions"
        :height="300"
      />
      <VAlert
        v-else
        type="info"
        text="No data available"
      />
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import type { WeightEntry } from '~/types/weight'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  entries: WeightEntry[]
}>()

const chartOptions = computed<EChartsOption>(() => {
  if (props.entries.length === 0) return {}

  return {
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const date = new Date(params[0].value[0])
        return `${date.toLocaleDateString()}: ${params[0].value[1].toFixed(1)} kg`
      }
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: (value: string) => {
          return new Date(value).toLocaleDateString()
        }
      }
    },
    yAxis: {
      type: 'value',
      name: 'Weight (kg)',
      axisLabel: {
        formatter: '{value} kg'
      }
    },
    series: [
      {
        type: 'line',
        data: props.entries.map(entry => [
          new Date(entry.date).getTime(),
          entry.weight
        ]),
        smooth: true,
        showSymbol: false
      }
    ]
  }
})
</script> 