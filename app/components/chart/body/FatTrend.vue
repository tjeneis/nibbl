<template>
  <VCard>
    <VCardTitle class="pt-6 px-6">{{ t('charts.bodyFatTrend') }}</VCardTitle>
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

type WeightEntry = Tables<'weight_entries'>
type UserProfile = Tables<'user_profiles'>

const props = defineProps<{
  entries: WeightEntry[]
}>()

const { getProfile } = useProfile()
const { data: profile } = await useAsyncData<UserProfile>('user-profile', () => getProfile(), {
  default: () => undefined,
  server: false
})

const { t } = useI18n()

const chartOptions = computed(() => {
  if (props.entries.length === 0) return {}

  // Define body fat ranges based on gender
  const fatRanges = profile.value?.gender === 'female' 
    ? [
        { min: 0, max: 14, color: 'rgba(255, 193, 7, 0.2)', name: t('healthMetrics.essential') },
        { min: 14, max: 21, color: 'rgba(76, 175, 80, 0.2)', name: t('healthMetrics.athletic') },
        { min: 21, max: 25, color: 'rgba(33, 150, 243, 0.2)', name: t('healthMetrics.fitness') },
        { min: 25, max: 32, color: 'rgba(156, 39, 176, 0.2)', name: t('healthMetrics.average') },
        { min: 32, max: 100, color: 'rgba(244, 67, 54, 0.2)', name: t('healthMetrics.high') }
      ]
    : [
        { min: 0, max: 6, color: 'rgba(255, 193, 7, 0.2)', name: t('healthMetrics.essential') },
        { min: 6, max: 14, color: 'rgba(76, 175, 80, 0.2)', name: t('healthMetrics.athletic') },
        { min: 14, max: 18, color: 'rgba(33, 150, 243, 0.2)', name: t('healthMetrics.fitness') },
        { min: 18, max: 25, color: 'rgba(156, 39, 176, 0.2)', name: t('healthMetrics.average') },
        { min: 25, max: 100, color: 'rgba(244, 67, 54, 0.2)', name: t('healthMetrics.high') }
      ]

  // Find the range containing the latest body fat percentage
  const latestFatPercentage = props.entries[0]?.fat_percentage
  const currentRange = latestFatPercentage != null 
    ? fatRanges.find(range => latestFatPercentage >= range.min && latestFatPercentage < range.max)
    : null

  const series = [
    {
      name: t('stats.bodyFat'),
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
          position: 'inside' as const,
          formatter: currentRange.name
        }
      } : undefined
    }
  ]

  return {
    tooltip: {
      trigger: 'axis',
      formatter: `{c}%`
    },
    grid: {
      containLabel: true
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      type: 'value',
      name: `${t('stats.bodyFat')} (%)`,
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
  } as EChartsOption
})
</script>
