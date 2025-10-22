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
const { getInvertedColor, isDark } = useThemeColors()

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

function toggleTheme () {
  if (global?.name?.value !== undefined && global?.current?.value !== undefined) {
    global.name.value = global.current.value.dark ? 'light' : 'dark'
  }
}

onMounted(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  if (global?.name?.value !== undefined) {
    global.name.value = mediaQuery.matches ? 'dark' : 'light'
  }
})
</script> 