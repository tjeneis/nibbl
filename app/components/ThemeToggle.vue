<template>
  <VBtn
    icon
    variant="text"
    :color="computedColor"
    @click="toggleTheme"
  >
    <VIcon>
      {{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
    </VIcon>
  </VBtn>
</template>

<script setup lang="ts">
const { global } = useTheme()

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

function toggleTheme () {
  global.name.value = global.current.value.dark ? 'light' : 'dark'
}

const isDark = computed(() => global.name.value === 'dark')

onMounted(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  global.name.value = mediaQuery.matches ? 'dark' : 'light'
})
</script> 