<template>
  <VCard>
    <VCardTitle>Latest Stats</VCardTitle>
    <VCardText>
      <VRow v-if="entry">
        <VCol cols="6">
          <div class="text-subtitle-2">Weight</div>
          <div class="text-body-1 text-medium-emphasis">{{ entry.weight.toFixed(1) }} kg</div>
        </VCol>
        <VCol cols="6">
          <div class="text-subtitle-2">BMI</div>
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
          <div class="text-subtitle-2">Body Fat</div>
          <div class="text-body-1 text-medium-emphasis">
            {{ entry.fat_percentage.toFixed(1) }}%
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
          <div class="text-subtitle-2">Muscle Mass</div>
          <div class="text-body-1 text-medium-emphasis">
            {{ entry.muscle_mass.toFixed(1) }} kg
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
          <div class="text-subtitle-2">Body Water</div>
          <div class="text-body-1 text-medium-emphasis">
            {{ entry.body_water_percentage.toFixed(1) }}%
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
          <div class="text-subtitle-2">Metabolic Age</div>
          <div class="text-body-1 text-medium-emphasis">{{ entry.metabolic_age }} years</div>
        </VCol>
      </VRow>
      <VAlert
        v-else
        type="info"
        text="No entries yet"
      />
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import type { WeightEntry } from '~/types/weight'
import type { Gender } from '~/types/profile'

const props = defineProps<{
  entry?: WeightEntry
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
  getBodyWaterColor
} = useHealthMetrics()

const { data: profile } = await useAsyncData('user-profile', () => getProfile())

const bmi = computed(() => {
  if (!props.entry?.weight || !profile.value?.height) return 0
  // Convert height from cm to m and calculate BMI
  const heightInMeters = profile.value.height / 100
  return props.entry.weight / (heightInMeters * heightInMeters)
})

const gender = computed<Gender>(() => {
  if (!profile.value?.gender) return 'male'
  return profile.value.gender
})
</script> 