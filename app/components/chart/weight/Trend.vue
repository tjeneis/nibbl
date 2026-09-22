<template>
  <VCard>
    <VCardTitle class="pt-6 px-6">{{ t('charts.weightTrend') }}</VCardTitle>
    <VCardText>
      <ChartBase
        v-if="entries.length > 0"
        :options="chartOptions"
        :height="300"
      />
      <ChartEmptyState
        v-else
      />
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import type { Tables } from '~/types/database.types'
import type { EChartsOption } from 'echarts'
import { formatDate, parseDate } from '~/utils/date'
import { getTimeAxis } from '~/utils/chart'

type WeightEntry = Tables<'weight_entries'>
type UserProfile = Tables<'user_profiles'>

const { t, locale } = useI18n()

const props = defineProps<{
  entries: WeightEntry[]
}>()

const { getProfile } = useProfile()
const { data: profile } = await useAsyncData<UserProfile>('user-profile', () => getProfile(), {
  default: () => undefined,
  server: false
})

const chartOptions = computed(() => {
  if (props.entries.length === 0) return {}

  const series = [
    {
      name: t('charts.weight'),
      type: 'line' as const,
      data: props.entries.map(entry => [parseDate(entry.date).getTime(), entry.weight]),
      smooth: true,
      // Keep the curve from looping back in time between entries that are close together
      smoothMonotone: 'x' as const,
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
      formatter: (params) => {
        const [point] = Array.isArray(params) ? params : [params]
        const [timestamp, value] = (point?.value ?? []) as [number, number]
        return `${formatDate(new Date(timestamp))}<br/>${value}kg`
      }
    },
    grid: {
      // Line the y-axis labels up with the card title (title has 24px padding, card text 16px)
      left: 8,
      right: 24,
      top: 16,
      bottom: 8,
      containLabel: true
    },
    xAxis: getTimeAxis(props.entries, locale.value),
    yAxis: {
      type: 'value',
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
  } as EChartsOption
})
</script>
