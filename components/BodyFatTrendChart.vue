<template>
  <VCard>
    <VCardTitle class="pt-6 px-6">Body Fat Trend</VCardTitle>
    <VCardText>
      <BaseChart
        v-if="entries.length > 0"
        :options="chartOptions"
        :height="300"
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
      name: 'Body Fat',
      type: 'line' as const,
      data: props.entries.map(entry => {
        const date = new Date(entry.date)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        return [`${day}-${month}`, entry.fat_percentage]
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
      markLine: profile.value?.goal_fat_percentage != null ? {
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
          { yAxis: profile.value.goal_fat_percentage }
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
          if (param.seriesName === 'Body Fat') {
            tooltip += `<span style='color:${param.color}'>●</span> Body Fat: ${param.data[1].toFixed(1)}%<br/>`
          } else if (param.seriesName === 'Goal Body Fat' && param.data != null) {
            tooltip += `<span style='color:${param.color}'>●</span> Goal Body Fat: ${param.data[1].toFixed(1)}%<br/>`
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
      name: 'Body Fat (%)',
      min: Math.min(
        ...props.entries.map(entry => entry.fat_percentage),
        profile.value?.goal_fat_percentage ?? Infinity
      ) - 2,
      max: Math.max(
        ...props.entries.map(entry => entry.fat_percentage),
        profile.value?.goal_fat_percentage ?? -Infinity
      ) + 2,
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series
  }
})
</script> 