<template>
  <VCard>
    <VCardTitle>Body Composition</VCardTitle>
    <VCardText>
      <BaseChart
        v-if="entry"
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
  entry?: WeightEntry | null
}>()

const chartOptions = computed<EChartsOption>(() => {
  if (!props.entry) return {}

  const fatMass = props.entry.weight * (props.entry.fat_percentage / 100)
  const muscleMass = props.entry.muscle_mass
  const boneMass = props.entry.bone_mass

  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}kg ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: fatMass, name: 'Fat' },
          { value: muscleMass, name: 'Muscle' },
          { value: boneMass, name: 'Bone' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script> 