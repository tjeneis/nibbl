<template>
  <VCard>
    <VCardTitle>Latest Stats</VCardTitle>
    <VCardText>
      <VList v-if="entry">
        <VListItem>
          <VListItemTitle>Weight</VListItemTitle>
          <VListItemSubtitle>{{ entry.weight.toFixed(1) }} kg</VListItemSubtitle>
        </VListItem>
        <VListItem>
          <VListItemTitle>BMI</VListItemTitle>
          <VListItemSubtitle>{{ entry.bmi.toFixed(1) }}</VListItemSubtitle>
        </VListItem>
        <VListItem>
          <VListItemTitle>Body Fat</VListItemTitle>
          <VListItemSubtitle>{{ entry.fat_percentage.toFixed(1) }}%</VListItemSubtitle>
        </VListItem>
        <VListItem>
          <VListItemTitle>Muscle Mass</VListItemTitle>
          <VListItemSubtitle>{{ entry.muscle_mass.toFixed(1) }} kg</VListItemSubtitle>
        </VListItem>
        <VListItem>
          <VListItemTitle>Body Water</VListItemTitle>
          <VListItemSubtitle>{{ entry.body_water_percentage.toFixed(1) }}%</VListItemSubtitle>
        </VListItem>
        <VListItem>
          <VListItemTitle>Metabolic Age</VListItemTitle>
          <VListItemSubtitle>{{ entry.metabolic_age }} years</VListItemSubtitle>
        </VListItem>
      </VList>
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
</script> 