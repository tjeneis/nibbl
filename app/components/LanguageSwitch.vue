<template>
  <VMenu location="bottom end">
    <template v-slot:activator="{ props }">
      <VBtn
        v-bind="props"
        variant="text"
        size="large"
        class="px-3"
        :color="color"
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

const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => locales.value.filter(i => i.code !== locale.value))

defineProps<{
  color?: string
}>()
</script>
