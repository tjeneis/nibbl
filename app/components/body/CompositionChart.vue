<template>
  <VCard>
    <VCardTitle class="pt-6 px-6">Body Composition</VCardTitle>
    <VCardText>
      <BaseChart
        v-if="entry"
        :options="chartOptions"
        :height="300"
      />
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import type { WeightEntry } from '~/types/weight'
import type { EChartsOption } from 'echarts'
import { useTheme } from 'vuetify'

const props = defineProps<{
  entry?: WeightEntry | null
}>()

const theme = useTheme()

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
      left: 'left',
      textStyle: {
        color: theme.current.value.dark ? '#fff' : '#000'
      }
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        label: {
          color: theme.current.value.dark ? '#fff' : '#000'
        },
        data: [
          { value: fatMass, name: 'Fat', itemStyle: { color: '#f72585' } },
          { value: muscleMass, name: 'Muscle', itemStyle: { color: '#7209b7' } },
          { value: boneMass, name: 'Bone', itemStyle: { color: '#4cc9f0' } }
        ]
      }
    ]
  }
})
</script> 