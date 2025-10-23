<template>
  <VMenu location="bottom end">
    <template #activator="{ props: activatorProps }">
      <VBtn
        v-bind="activatorProps"
        variant="text"
        class="px-0"
        :color="computedColor"
      >
        {{ currentLocale.toUpperCase() }}
        <template #append>
          <VIcon icon="mdi-chevron-down" />
        </template>
      </VBtn>
    </template>
    
    <VList>
      <VListItem
        v-for="availableLocale in availableLocales"
        :key="availableLocale.code"
        :to="switchLocalePath(availableLocale.code)"
        :active="availableLocale.code === currentLocale"
      >
        <VListItemTitle>{{ availableLocale.name }}</VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const { getInvertedColor } = useThemeColors()

const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => locales.value.filter(i => i.code !== locale.value))

const props = defineProps<{
  color?: string
}>()

const computedColor = computed(() => {
  // If color is explicitly provided, use it
  if (props.color) {
    return props.color
  }
  
  // Otherwise, invert based on theme
  return getInvertedColor()
})
</script>
