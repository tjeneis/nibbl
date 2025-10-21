<template>
  <VMenu location="bottom end">
    <template v-slot:activator="{ props }">
      <VBtn
        v-bind="props"
        variant="text"
        size="large"
        class="px-3"
        append-icon="mdi-chevron-down"
      >
        {{ currentLocale }}
      </VBtn>
    </template>
    <VList>
      <VListItem
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="setLocale(locale.code)"
        :class="{ 'bg-primary': locale.code === currentLocale }"
      >
        <VListItemTitle>{{ locale.name }}</VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => locales.value)
</script>
