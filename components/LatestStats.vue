<template>
  <VCard>
    <VCardTitle>Latest Stats</VCardTitle>
    <VCardText>
      <VRow v-if="entry">
        <VCol cols="12" sm="6">
          <div class="text-subtitle-2">Weight</div>
          <div class="text-body-1 text-medium-emphasis">{{ entry.weight.toFixed(1) }} kg</div>
        </VCol>
        <VCol cols="12" sm="6">
          <div class="text-subtitle-2">BMI</div>
          <div class="text-body-1 text-medium-emphasis">
            {{ entry.bmi.toFixed(1) }}
            <VChip
              size="x-small"
              label
              :color="getBmiColor(entry.bmi)"
              class="ml-1"
            >
              {{ getBmiStatus(entry.bmi) }}
            </VChip>
          </div>
        </VCol>
        <VCol cols="12" sm="6">
          <div class="text-subtitle-2">Body Fat</div>
          <div class="text-body-1 text-medium-emphasis">
            {{ entry.fat_percentage.toFixed(1) }}%
            <VChip
              size="x-small"
              label
              :color="getBodyFatColor(entry.fat_percentage)"
              class="ml-1"
            >
              {{ getBodyFatStatus(entry.fat_percentage) }}
            </VChip>
          </div>
        </VCol>
        <VCol cols="12" sm="6">
          <div class="text-subtitle-2">Muscle Mass</div>
          <div class="text-body-1 text-medium-emphasis">
            {{ entry.muscle_mass.toFixed(1) }} kg
            <VChip
              size="x-small"
              label
              :color="getMuscleMassColor(entry.muscle_mass)"
              class="ml-1"
            >
              {{ getMuscleMassStatus(entry.muscle_mass) }}
            </VChip>
          </div>
        </VCol>
        <VCol cols="12" sm="6">
          <div class="text-subtitle-2">Body Water</div>
          <div class="text-body-1 text-medium-emphasis">
            {{ entry.body_water_percentage.toFixed(1) }}%
            <VChip
              size="x-small"
              label
              :color="getBodyWaterColor(entry.body_water_percentage)"
              class="ml-1"
            >
              {{ getBodyWaterStatus(entry.body_water_percentage) }}
            </VChip>
          </div>
        </VCol>
        <VCol cols="12" sm="6">
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

defineProps<{
  entry?: WeightEntry
}>()

const getBmiStatus = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

const getBmiColor = (bmi: number): string => {
  if (bmi < 18.5) return 'warning'
  if (bmi < 25) return 'success'
  if (bmi < 30) return 'warning'
  return 'error'
}

const getBodyFatStatus = (fatPercentage: number): string => {
  if (fatPercentage < 6) return 'Essential'
  if (fatPercentage < 14) return 'Athletic'
  if (fatPercentage < 18) return 'Fitness'
  if (fatPercentage < 25) return 'Average'
  return 'High'
}

const getBodyFatColor = (fatPercentage: number): string => {
  if (fatPercentage < 6) return 'warning'
  if (fatPercentage < 14) return 'success'
  if (fatPercentage < 18) return 'info'
  if (fatPercentage < 25) return 'primary'
  return 'error'
}

const getMuscleMassStatus = (muscleMass: number): string => {
  if (muscleMass < 30) return 'Low'
  if (muscleMass < 35) return 'Below Average'
  if (muscleMass < 40) return 'Average'
  if (muscleMass < 45) return 'Above Average'
  return 'High'
}

const getMuscleMassColor = (muscleMass: number): string => {
  if (muscleMass < 30) return 'error'
  if (muscleMass < 35) return 'warning'
  if (muscleMass < 40) return 'primary'
  if (muscleMass < 45) return 'info'
  return 'success'
}

const getBodyWaterStatus = (waterPercentage: number): string => {
  if (waterPercentage < 45) return 'Low'
  if (waterPercentage < 50) return 'Below Average'
  if (waterPercentage < 65) return 'Normal'
  return 'High'
}

const getBodyWaterColor = (waterPercentage: number): string => {
  if (waterPercentage < 45) return 'error'
  if (waterPercentage < 50) return 'warning'
  if (waterPercentage < 65) return 'success'
  return 'info'
}
</script> 