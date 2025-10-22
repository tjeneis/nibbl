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
        <template v-slot:item.date="{ item }">
          <div class="text-no-wrap">{{ formatDate(item.date) }}</div>
        </template>
        <template v-slot:item.weight="{ item }">
          {{ item.weight.toFixed(1) }} kg
        </template>
        <template v-slot:item.fat_percentage="{ item }">
          {{ item.fat_percentage.toFixed(1) }}{{ t('stats.percent') }}
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
        <template v-slot:item.metabolic_age="{ item }">
          {{ item.metabolic_age }} {{ t('stats.years') }}
        </template>
        <template v-slot:item.body_water_percentage="{ item }">
          {{ item.body_water_percentage.toFixed(1) }}{{ t('stats.percent') }}
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
import type { Tables } from '~/types/database.types'

type WeightEntry = Tables<'weight_entries'>
import { formatDate } from '~/utils/date'

interface Props {
  entries: WeightEntry[]
  loading?: boolean
}

interface Emits {
  (e: 'update'): void
}

const props = defineProps<Props>()
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
