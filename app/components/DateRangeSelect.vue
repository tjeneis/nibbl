<template>
  <VBtnToggle
    v-model="model"
    mandatory
    density="compact"
    variant="outlined"
    divided
  >
    <VBtn
      v-for="range in DATE_RANGES"
      :key="range"
      :value="range"
      :text="t(`dateRange.${range}`)"
    />
  </VBtnToggle>
</template>

<script setup lang="ts">
import { DATE_RANGES, type DateRange } from '~/utils/date'

const { t } = useI18n()

const model = defineModel<DateRange>({ required: true })
</script>
