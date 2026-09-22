<template>
  <VContainer fluid>
    <VRow dense>
      <VCol cols="12" class="d-flex justify-end">
        <DateRangeSelect v-model="range" />
      </VCol>

      <VCol cols="12" md="4">
        <ChartWeightTrend :entries="filteredEntries" class="fill-height" />
      </VCol>

      <VCol cols="12" md="4">
        <ChartBodyFatTrend :entries="filteredEntries" class="fill-height" />
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
          :entries="filteredEntries"
          :loading="pending"
          @update="refresh"
        />
      </VCol>
    </VRow>

    <AddEntryDialog
      v-model="showDialog"
      :last-entry="latestEntry"
      @saved="refresh"
    />
  </VContainer>
</template>

<script setup lang="ts">
import type { Tables } from '~/types/database.types'
import { DATE_RANGES, filterByDateRange, parseDate, type DateRange } from '~/utils/date'

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

const rangeCookie = useCookie<DateRange>('dashboard-range', { default: () => 'all' })
const range = computed<DateRange>({
  get: () => DATE_RANGES.includes(rangeCookie.value) ? rangeCookie.value : 'all',
  set: value => { rangeCookie.value = value }
})

// Latest stats and the add-entry prefill always use the most recent entry, regardless of range
const latestEntry = computed(() => entries.value?.[entries.value.length - 1])

// Ranges count back from the most recent entry, so a pause in tracking doesn't leave the charts empty
const filteredEntries = computed(() => {
  const latestDate = latestEntry.value?.date
  if (!latestDate) return []
  return filterByDateRange(entries.value, range.value, parseDate(latestDate))
})
</script>