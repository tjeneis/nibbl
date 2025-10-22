<template>
  <VApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </VApp>
</template>

<script setup>
const { global } = useTheme()

onMounted(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const updateTheme = () => {
    if (global?.name?.value !== undefined) {
      global.name.value = mediaQuery.matches ? 'dark' : 'light'
    }
  }

  updateTheme()
  mediaQuery.addEventListener('change', updateTheme)
  
  // Cleanup listener on unmount
  onUnmounted(() => {
    mediaQuery.removeEventListener('change', updateTheme)
  })
})
</script>