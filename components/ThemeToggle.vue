<template>
  <VBtn
    icon
    theme="light"
    @click="toggleTheme"
  >
    <VIcon>
      {{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
    </VIcon>
  </VBtn>
</template>

<script setup lang="ts">
const { global } = useTheme()

function toggleTheme () {
  global.name.value = global.current.value.dark ? 'light' : 'dark'
}

const isDark = computed(() => global.name.value === 'dark')

onMounted(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  global.name.value = mediaQuery.matches ? 'dark' : 'light'
})
</script> 