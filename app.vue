<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { global } = useTheme()

onMounted(() => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const updateTheme = () => {
    global.name.value = mediaQuery.matches ? 'dark' : 'light'
  }

  updateTheme()
  mediaQuery.addEventListener('change', updateTheme)
})
</script>