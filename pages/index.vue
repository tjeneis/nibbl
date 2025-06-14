<template>
  <VContainer fluid>
    <VRow>
      <VCol cols="12" md="4">
        <WeightTrendChart :entries="entries" class="fill-height" />
      </VCol>

      <VCol cols="12" md="4">
        <BodyCompositionChart :entry="latestEntry" class="fill-height" />
      </VCol>

      <VCol cols="12" md="4">
        <LatestStats :entry="latestEntry" class="fill-height" />
      </VCol>

      <VCol cols="12">
        <WeightHistory
          :entries="entries"
          :loading="pending"
          @update="refresh"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import type { WeightEntry } from '~/types/weight'

definePageMeta({
  middleware: ['auth']
})

const { getWeightEntries } = useWeight()

const { data: entries, pending, refresh } = await useAsyncData<WeightEntry[]>(
  'weight-entries',
  () => getWeightEntries(),
  { default: () => [] }
)

const latestEntry = computed(() => entries.value?.[0])
</script> 