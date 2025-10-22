<template>
  <VCard>
    <VCardTitle class="pa-6">{{ t('stats.latestStats') }}</VCardTitle>
    <VCardText class="px-6 pb-8">
      <VRow v-if="entry">
        <VCol cols="6">
          <div class="text-subtitle-2">{{ t('stats.weight') }}</div>
          <div class="text-body-1 text-medium-emphasis">
            {{ entry.weight.toFixed(1) }} {{ t('stats.kg') }}
            <VChip
              size="x-small"
              label
              :color="getWeightColor(entry.weight, profile?.goal_weight || 0)"
              class="ml-1"
            >
              {{ getWeightStatus(entry.weight, profile?.goal_weight || 0) }}
            </VChip>
          </div>
        </VCol>
        <VCol cols="6">
          <div class="text-subtitle-2">{{ t('stats.bmi') }}</div>
          <div class="text-body-1 text-medium-emphasis">
            {{ bmi.toFixed(1) }}
            <VChip
              size="x-small"
              label
              :color="getBmiColor(bmi)"
              class="ml-1"
            >
              {{ getBmiStatus(bmi) }}
            </VChip>
          </div>
        </VCol>
        <VCol cols="6">
          <div class="text-subtitle-2">{{ t('stats.bodyFat') }}</div>
          <div class="text-body-1 text-medium-emphasis">
            {{ entry.fat_percentage.toFixed(1) }}{{ t('stats.percent') }}
            <VChip
              size="x-small"
              label
              :color="getBodyFatColor(entry.fat_percentage, gender)"
              class="ml-1"
            >
              {{ getBodyFatStatus(entry.fat_percentage, gender) }}
            </VChip>
          </div>
        </VCol>
        <VCol cols="6">
          <div class="text-subtitle-2">{{ t('stats.muscleMass') }}</div>
          <div class="text-body-1 text-medium-emphasis">
            {{ entry.muscle_mass.toFixed(1) }} {{ t('stats.kg') }}
            <VChip
              size="x-small"
              label
              :color="getMuscleMassColor(entry.muscle_mass, gender)"
              class="ml-1"
            >
              {{ getMuscleMassStatus(entry.muscle_mass, gender) }}
            </VChip>
          </div>
        </VCol>
        <VCol cols="6">
          <div class="text-subtitle-2">{{ t('stats.bodyWater') }}</div>
          <div class="text-body-1 text-medium-emphasis">
            {{ entry.body_water_percentage.toFixed(1) }}{{ t('stats.percent') }}
            <VChip
              size="x-small"
              label
              :color="getBodyWaterColor(entry.body_water_percentage, gender)"
              class="ml-1"
            >
              {{ getBodyWaterStatus(entry.body_water_percentage, gender) }}
            </VChip>
          </div>
        </VCol>
        <VCol cols="6">
          <div class="text-subtitle-2">{{ t('stats.metabolicAge') }}</div>
          <div class="text-body-1 text-medium-emphasis">
            {{ entry.metabolic_age }} {{ t('stats.years') }}
            <VChip
              size="x-small"
              label
              :color="getMetabolicAgeColor(entry.metabolic_age, age)"
              class="ml-1"
            >
              {{ getMetabolicAgeStatus(entry.metabolic_age, age) }}
            </VChip>
          </div>
        </VCol>
        <VCol cols="6">
          <div class="text-subtitle-2">{{ t('stats.physiqueLevel') }}</div>
          <div class="text-body-1 text-medium-emphasis">
            {{ entry.physique_level.toFixed(1) }}
            <VChip
              size="x-small"
              label
              :color="getPhysiqueLevelColor(entry.physique_level)"
              class="ml-1"
            >
              {{ getPhysiqueLevelStatus(entry.physique_level) }}
            </VChip>
          </div>
        </VCol>
        <VCol cols="6">
          <div class="text-subtitle-2">{{ t('stats.visceralFat') }}</div>
          <div class="text-body-1 text-medium-emphasis">
            {{ entry.visceral_level.toFixed(1) }}
            <VChip
              size="x-small"
              label
              :color="getVisceralFatColor(entry.visceral_level)"
              class="ml-1"
            >
              {{ getVisceralFatStatus(entry.visceral_level) }}
            </VChip>
          </div>
        </VCol>
      </VRow>
      <ChartEmptyState
        v-else
        @action="$emit('addEntry')"
      />
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import type { Tables } from '~/types/database.types'
import type { Gender } from '~/types/common'

type WeightEntry = Tables<'weight_entries'>

const { t } = useI18n()

const props = defineProps<{
  entry?: WeightEntry
}>()

defineEmits<{
  addEntry: []
}>()

const { getProfile } = useProfile()
const { 
  getBmiStatus,
  getBmiColor,
  getBodyFatStatus,
  getBodyFatColor,
  getMuscleMassStatus,
  getMuscleMassColor,
  getBodyWaterStatus,
  getBodyWaterColor,
  getPhysiqueLevelStatus,
  getPhysiqueLevelColor,
  getVisceralFatStatus,
  getVisceralFatColor,
  getMetabolicAgeStatus,
  getMetabolicAgeColor,
  getWeightStatus,
  getWeightColor
} = useHealthMetrics()

const { data: profile } = await useAsyncData('user-profile', () => getProfile(), {
  default: () => undefined,
  server: false
})

const bmi = computed(() => {
  if (!props.entry?.weight || !profile.value?.height) return 0
  // Convert height from cm to m and calculate BMI
  const heightInMeters = profile.value.height / 100
  return props.entry.weight / (heightInMeters * heightInMeters)
})

const gender = computed<Gender>(() => {
  if (!profile.value?.gender) return 'male'
  return profile.value.gender as Gender
})

const age = computed(() => {
  if (!profile.value?.date_of_birth) return 0
  const birthDate = new Date(profile.value.date_of_birth)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
})
</script> 