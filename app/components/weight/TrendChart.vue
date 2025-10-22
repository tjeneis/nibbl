<template>
  <VCard>
    <VCardTitle class="pt-6 px-6">{{ t('charts.weightTrend') }}</VCardTitle>
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
import type { Tables } from '~/types/database.types'

type WeightEntry = Tables<'weight_entries'>
type UserProfile = Tables<'user_profiles'>
import type { EChartsOption } from 'echarts'

const { t } = useI18n()

const props = defineProps<{
  entries: WeightEntry[]
}>()

const { getProfile } = useProfile()
const { data: profile } = await useAsyncData<UserProfile>('user-profile', () => getProfile(), {
  default: () => undefined,
  server: false
})

const chartOptions = computed<EChartsOption>(() => {
  if (props.entries.length === 0) return {}

  const series = [
    {
      name: t('charts.weight'),
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
          formatter: t('charts.goal'),
          position: 'end' as const,
          color: '#7209b7'
        },
        lineStyle: {
          color: '#7209b7',
          width: 2
        },
        data: [
          { yAxis: profile.value?.goal_weight }
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
          if (param.seriesName === t('charts.weight')) {
            tooltip += `<span style='color:${param.color}'>●</span> ${t('charts.weight')}: ${param.data[1].toFixed(1)} ${t('stats.kg')}<br/>`
          } else if (param.seriesName === t('charts.goalWeight') && param.data != null) {
            tooltip += `<span style='color:${param.color}'>●</span> ${t('charts.goalWeight')}: ${param.data[1].toFixed(1)} ${t('stats.kg')}<br/>`
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
      name: t('charts.weightKg'),
      min: Math.floor(Math.min(
        ...props.entries.map(entry => entry.weight),
        profile.value?.goal_weight ?? Infinity
      ) - 2),
      max: Math.ceil(Math.max(
        ...props.entries.map(entry => entry.weight),
        profile.value?.goal_weight ?? -Infinity
      ) + 2),
      axisLabel: {
        formatter: `{value} ${t('stats.kg')}`
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