<template>
  <VContainer fluid>
    <VRow dense>
      <VCol cols="12" md="4">
        <ChartWeightTrend :entries="entries" class="fill-height" />
      </VCol>

      <VCol cols="12" md="4">
        <ChartBodyFatTrend :entries="entries" class="fill-height" />
      </VCol>

      <VCol cols="12" md="4">
        <ChartBodyComposition :entry="latestEntry" class="fill-height" />
      </VCol>

      <VCol cols="12" md="4">
        <ChartWeightLatestStats :entry="latestEntry" class="fill-height" />
      </VCol>

      <VCol cols="12" md="8">
        <ChartWeightHistory
          class="fill-height"
          :entries="entries"
          :loading="pending"
          @update="refresh"
        />
      </VCol>
    </VRow>

    <AddEntryDialog
      v-model="showDialog"
      @success="refresh"
    />
  </VContainer>
</template>

<script setup lang="ts">
import type { Tables } from '~/types/database.types'

type WeightEntry = Tables<'weight_entries'>

const { t } = useI18n()
const { getWeightEntries } = useWeight()
const { showDialog } = useAddEntry()

definePageMeta({
  middleware: 'auth'
})

useHead({
  title: () => t('navigation.dashboard'),
})

const { data: entries, pending, refresh } = await useAsyncData<WeightEntry[]>(
  'weight-entries',
  () => getWeightEntries(),
  { default: () => [] }
)

const latestEntry = computed(() => entries.value?.[entries.value.length - 1])
</script>