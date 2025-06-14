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
          :loading="loading"
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
const entries = ref<WeightEntry[]>([])
const loading = ref(true)

const latestEntry = computed(() => entries.value[0])

async function loadEntries() {
  try {
    loading.value = true
    entries.value = await getWeightEntries()
  } catch (error) {
    console.error('Error loading entries:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadEntries()
})
</script> 