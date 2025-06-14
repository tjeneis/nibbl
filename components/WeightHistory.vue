<template>
  <VCard>
    <VCardTitle>Weight History</VCardTitle>
    <VCardText>
      <VDataTable
        :headers="headers"
        :items="entries"
        :loading="loading"
      >
        <template v-slot:item.date="{ item }">
          <div class="text-no-wrap">{{ formatDate(item.date) }}</div>
        </template>
        <template v-slot:item.weight="{ item }">
          {{ item.weight.toFixed(1) }} kg
        </template>
        <template v-slot:item.bmi="{ item }">
          {{ item.bmi.toFixed(1) }}
        </template>
        <template v-slot:item.fat_percentage="{ item }">
          {{ item.fat_percentage.toFixed(1) }}%
        </template>
        <template v-slot:item.visceral_level="{ item }">
          {{ item.visceral_level.toFixed(1) }}
        </template>
        <template v-slot:item.muscle_mass="{ item }">
          {{ item.muscle_mass.toFixed(1) }} kg
        </template>
        <template v-slot:item.physique_level="{ item }">
          {{ item.physique_level.toFixed(1) }}
        </template>
        <template v-slot:item.bone_mass="{ item }">
          {{ item.bone_mass.toFixed(1) }} kg
        </template>
        <template v-slot:item.kcal_intake="{ item }">
          {{ item.kcal_intake }} kcal
        </template>
        <template v-slot:item.kj_intake="{ item }">
          {{ item.kj_intake }} kJ
        </template>
        <template v-slot:item.metabolic_age="{ item }">
          {{ item.metabolic_age }} years
        </template>
        <template v-slot:item.body_water_percentage="{ item }">
          {{ item.body_water_percentage.toFixed(1) }}%
        </template>
        <template v-slot:item.actions="{ item }">
          <VBtn
            icon="mdi-delete-outline"
            variant="text"
            size="small"
            @click="handleDelete(item)"
          />
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import type { WeightEntry } from '~/types/weight'
import { formatDate } from '~/utils/date'

defineProps<{
  entries: WeightEntry[]
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'update'): void
}>()

const { deleteWeightEntry } = useWeight()
const deleting = ref(false)

const handleDelete = async (entry: WeightEntry) => {
  if (!confirm(`Are you sure you want to delete the weight entry from ${formatDate(entry.date)}?`)) {
    return
  }

  try {
    deleting.value = true
    await deleteWeightEntry(entry.id)
    emit('update')
  } catch (error) {
    console.error('Error deleting entry:', error)
  } finally {
    deleting.value = false
  }
}

const headers = [
  { title: 'Date', key: 'date' },
  { title: 'Weight', key: 'weight' },
  { title: 'BMI', key: 'bmi' },
  { title: 'Body Fat %', key: 'fat_percentage' },
  { title: 'Visceral Level', key: 'visceral_level' },
  { title: 'Muscle Mass', key: 'muscle_mass' },
  { title: 'Physique Level', key: 'physique_level' },
  { title: 'Bone Mass', key: 'bone_mass' },
  { title: 'Calorie Intake', key: 'kcal_intake' },
  { title: 'Energy Intake', key: 'kj_intake' },
  { title: 'Metabolic Age', key: 'metabolic_age' },
  { title: 'Body Water %', key: 'body_water_percentage' },
  { title: 'Actions', key: 'actions', sortable: false }
]
</script> 