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
const theme = useTheme()

const chartOptions = computed<EChartsOption>(() => {
  if (props.entries.length === 0) return {}

  const dates = props.entries.map(entry => new Date(entry.date).getTime())
  const minDate = Math.min(...dates)
  const maxDate = Math.max(...dates)

  const series = [
    {
      name: 'Weight',
      type: 'line' as const,
      data: props.entries.map(entry => [new Date(entry.date).getTime(), entry.weight]),
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
          formatter: 'Goal Weight',
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
        const date = new Date(params[0].axisValue)
        let tooltip = `${formatDate(date)}<br/>`
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
      top: 60,
      right: 30,
      bottom: 40,
      left: 20,
      containLabel: true
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        formatter: (value: number) => {
          const date = new Date(value)
          const day = date.getDate().toString().padStart(2, '0')
          const month = (date.getMonth() + 1).toString().padStart(2, '0')
          return `${day}-${month}`
        }
      }
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