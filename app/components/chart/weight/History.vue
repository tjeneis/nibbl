<!-- eslint-disable vue/valid-v-slot -->
<template>
  <VCard>
    <VCardTitle class="pt-6 px-6">{{ t('history.weightHistory') }}</VCardTitle>
    <VCardText>
      <VDataTable
        :headers="headers"
        :items="entries"
        :loading="loading"
        :sort-by="[{ key: 'date', order: 'desc' }]"
      >
        <template #item.date="slotProps">
          <div class="text-no-wrap">{{ formatDate(slotProps.item.date) }}</div>
        </template>
        <template #item.weight="slotProps">
          {{ slotProps.item.weight.toFixed(1) }} kg
        </template>
        <template #item.fat_percentage="slotProps">
          {{ slotProps.item.fat_percentage.toFixed(1) }}{{ t('stats.percent') }}
        </template>
        <template #item.visceral_level="slotProps">
          {{ slotProps.item.visceral_level.toFixed(1) }}
        </template>
        <template #item.muscle_mass="slotProps">
          {{ slotProps.item.muscle_mass.toFixed(1) }} kg
        </template>
        <template #item.physique_level="slotProps">
          {{ slotProps.item.physique_level.toFixed(1) }}
        </template>
        <template #item.bone_mass="slotProps">
          {{ slotProps.item.bone_mass.toFixed(1) }} kg
        </template>
        <template #item.kcal_intake="slotProps">
          {{ slotProps.item.kcal_intake }} kcal
        </template>
        <template #item.metabolic_age="slotProps">
          {{ slotProps.item.metabolic_age }} {{ t('stats.years') }}
        </template>
        <template #item.body_water_percentage="slotProps">
          {{ slotProps.item.body_water_percentage.toFixed(1) }}{{ t('stats.percent') }}
        </template>
        <template #item.actions="slotProps">
          <VBtn
            icon="mdi-delete-outline"
            variant="text"
            size="small"
            @click="handleDelete(slotProps.item)"
          />
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import type { Tables } from '~/types/database.types'
import { formatDate } from '~/utils/date'

type WeightEntry = Tables<'weight_entries'>

interface Props {
  entries: WeightEntry[]
  loading?: boolean
}

interface Emits {
  (e: 'update'): void
}

const _props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { deleteWeightEntry } = useWeight()
const { t } = useI18n()
const deleting = ref(false)

const handleDelete = async (entry: WeightEntry) => {
  if (!confirm(t('weight.confirmDelete', { date: formatDate(entry.date) }))) {
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

const headers = computed(() => [
  { title: t('history.date'), key: 'date' },
  { title: t('history.weight'), key: 'weight' },
  { title: t('history.bodyFatPercent'), key: 'fat_percentage' },
  { title: t('history.visceralLevel'), key: 'visceral_level' },
  { title: t('history.muscleMass'), key: 'muscle_mass' },
  { title: t('history.physiqueLevel'), key: 'physique_level' },
  { title: t('history.boneMass'), key: 'bone_mass' },
  { title: t('history.calorieIntake'), key: 'kcal_intake' },
  { title: t('history.metabolicAge'), key: 'metabolic_age' },
  { title: t('history.bodyWaterPercent'), key: 'body_water_percentage' },
  { title: t('history.actions'), key: 'actions', sortable: false }
])
</script>
