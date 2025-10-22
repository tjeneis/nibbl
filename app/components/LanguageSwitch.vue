<template>
  <VMenu location="bottom end">
    <template v-slot:activator="{ props }">
      <VBtn
        v-bind="props"
        variant="text"
        class="px-0"
        :color="computedColor"
      >
        {{ currentLocale }}
        <template #append>
          <VIcon icon="mdi-chevron-down" class="ml-n2" />
        </template>
      </VBtn>
    </template>
    
    <VList>
      <VListItem
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
        :active="locale.code === currentLocale"
      >
        <VListItemTitle>{{ locale.name }}</VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const { global } = useTheme()

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
  return global.name.value === 'dark' ? 'white' : 'black'
})
</script>
