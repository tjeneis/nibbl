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
import type { UserProfile } from '~/types/profile'
import type { EChartsOption } from 'echarts'
import { formatDate } from '~/utils/date'
import { useTheme } from 'vuetify'

const props = defineProps<{
  entries: WeightEntry[]
}>()

const { getProfile } = useProfile()
const { data: profile } = await useAsyncData<UserProfile>('user-profile', () => getProfile())

const chartOptions = computed<EChartsOption>(() => {
  if (props.entries.length === 0) return {}

  const series = [
    {
      name: 'Weight',
      type: 'line' as const,
      data: props.entries.map(entry => {
        const date = new Date(entry.date)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        return [`${day}-${month}`, entry.weight]
      }),
      smooth: true,
      symbol: 'circle',
      lineStyle: {
        width: 3,
        color: '#f72585'
      },
      itemStyle: {
        color: '#f72585'
      },
      markLine: profile.value?.goal_weight != null ? {
        symbol: 'none',
        label: {
          formatter: 'Goal',
          position: 'end' as const,
          color: '#7209b7'
        },
        lineStyle: {
          color: '#7209b7',
          width: 2
        },
        data: [
          { yAxis: profile.value.goal_weight }
        ]
      } : undefined
    }
  ]

  return {
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        let tooltip = `${params[0].axisValue}<br/>`
        params.forEach((param: any) => {
          if (param.seriesName === 'Weight') {
            tooltip += `<span style='color:${param.color}'>●</span> Weight: ${param.data[1].toFixed(1)} kg<br/>`
          } else if (param.seriesName === 'Goal Weight' && param.data != null) {
            tooltip += `<span style='color:${param.color}'>●</span> Goal Weight: ${param.data[1].toFixed(1)} kg<br/>`
          }
        })
        return tooltip
      }
    },
    grid: {
      containLabel: true
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      type: 'value',
      name: 'Weight (kg)',
      min: Math.min(
        ...props.entries.map(entry => entry.weight),
        profile.value?.goal_weight ?? Infinity
      ) - 2,
      max: Math.max(
        ...props.entries.map(entry => entry.weight),
        profile.value?.goal_weight ?? -Infinity
      ) + 2,
      axisLabel: {
        formatter: '{value} kg'
      }
    },
    series
  }
})
</script> 