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

const props = defineProps<{
  entries: WeightEntry[]
}>()

const { getProfile } = useProfile()
const { data: profile } = await useAsyncData<UserProfile>('user-profile', () => getProfile())

const chartOptions = computed<EChartsOption>(() => {
  if (props.entries.length === 0) return {}

  // Define body fat ranges based on gender
  const fatRanges = profile.value?.gender === 'female' 
    ? [
        { min: 0, max: 14, color: 'rgba(255, 193, 7, 0.2)', name: 'Essential' },
        { min: 14, max: 21, color: 'rgba(76, 175, 80, 0.2)', name: 'Athletic' },
        { min: 21, max: 25, color: 'rgba(33, 150, 243, 0.2)', name: 'Fitness' },
        { min: 25, max: 32, color: 'rgba(156, 39, 176, 0.2)', name: 'Average' },
        { min: 32, max: 100, color: 'rgba(244, 67, 54, 0.2)', name: 'High' }
      ]
    : [
        { min: 0, max: 6, color: 'rgba(255, 193, 7, 0.2)', name: 'Essential' },
        { min: 6, max: 14, color: 'rgba(76, 175, 80, 0.2)', name: 'Athletic' },
        { min: 14, max: 18, color: 'rgba(33, 150, 243, 0.2)', name: 'Fitness' },
        { min: 18, max: 25, color: 'rgba(156, 39, 176, 0.2)', name: 'Average' },
        { min: 25, max: 100, color: 'rgba(244, 67, 54, 0.2)', name: 'High' }
      ]

  // Find the range containing the latest body fat percentage
  const latestFatPercentage = props.entries[0]?.fat_percentage
  const currentRange = latestFatPercentage != null 
    ? fatRanges.find(range => latestFatPercentage >= range.min && latestFatPercentage < range.max)
    : null

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
      markArea: currentRange ? {
        silent: true,
        itemStyle: {
          color: currentRange.color
        },
        data: [
          [
            {
              name: currentRange.name,
              yAxis: currentRange.min
            },
            {
              yAxis: currentRange.max
            }
          ]
        ],
        label: {
          show: true,
          position: 'inside',
          formatter: currentRange.name
        }
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
      min: Math.floor(Math.min(...props.entries.map(entry => entry.fat_percentage)) - 5),
      max: Math.ceil(Math.max(...props.entries.map(entry => entry.fat_percentage)) + 5),
      axisLabel: {
        formatter: '{value}%'
      },
      splitLine: {
        lineStyle: {
          color: '#666',
          width: 1
        }
      }
    },
    series
  }
})
</script> 