<template>
  <VContainer fluid>
    <VRow dense>
      <VCol cols="12" md="4">
        <WeightTrendChart :entries="entries" class="fill-height" />
      </VCol>

      <VCol cols="12" md="4">
        <BodyFatTrendChart :entries="entries" class="fill-height" />
      </VCol>

      <VCol cols="12" md="4">
        <BodyCompositionChart :entry="latestEntry" class="fill-height" />
      </VCol>

      <VCol cols="12" md="4">
        <LatestStats :entry="latestEntry" class="fill-height" />
      </VCol>

      <VCol cols="12" md="8">
        <WeightHistory
          class="fill-height"
          :entries="entries"
          :loading="pending"
          @update="refresh"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import type { Tables } from '~/types/database.types'

type WeightEntry = Tables<'weight_entries'>

const { t } = useI18n()
const { getWeightEntries } = useWeight()

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