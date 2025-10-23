<template>
  <VSheet min-height="300" class="text-center d-flex flex-column align-center justify-center ga-3">
    <h6
      class="text-h6 text-medium-emphasis"
    >
      {{ title }}
    </h6>
    <p
      class="text-body-2 text-grey-darken-1"
    >
      {{ description }}
    </p>
     <VBtn
       v-if="showAction"
       :color="getInvertedSurfaceColor()"
       variant="tonal"
       :text="actionText"
       @click="openDialog"
     />
  </VSheet>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  actionText?: string
  showAction?: boolean
}

const _props = withDefaults(defineProps<Props>(), {
  title: () => useI18n().t('emptyState.title'),
  description: () => useI18n().t('emptyState.description'),
  actionText: () => useI18n().t('emptyState.action'),
  showAction: true
})

const { getInvertedSurfaceColor } = useThemeColors()
const { openDialog } = useAddEntry()

defineEmits<{
  action: []
}>()
</script>
