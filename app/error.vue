<template>
  <VApp>
    <VMain class="height-screen">
      <VContainer class="fill-height">
        <VRow justify="center" align="center">
          <VCol cols="12" sm="8" md="6" lg="4">
            <VCard class="pa-4">
              <VCardTitle class="text-center text-h4 mb-4">
                Oops!
              </VCardTitle>
              <VCardText class="text-center">
                <VIcon
                  icon="mdi-alert-circle"
                  color="error"
                  size="64"
                  class="mb-4"
                />
                <p class="text-h6 mb-4">
                  {{ errorMessage }}
                </p>
                <div class="d-flex flex-column ga-2">
                  <VBtn
                    color="primary"
                    @click="handleError"
                  >
                    Try Again
                  </VBtn>
                  <VBtn
                    variant="outlined"
                    @click="goHome"
                  >
                    Go Home
                  </VBtn>
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
      
      <!-- Theme and language controls -->
      <div class="position-absolute top-0 right-0 pa-3 pa-md-6 d-flex align-center justify-end ga-md-2">
        <LanguageSwitch />
        <ThemeToggle />
      </div>
    </VMain>
  </VApp>
</template>

<script setup lang="ts">
interface NuxtError extends Error {
  statusCode?: number
  statusMessage?: string
}

const props = defineProps<{
  error: NuxtError
}>()

const localePath = useLocalePath()

// Handle error message display
const errorMessage = computed(() => {
  if (!props.error) return 'Something went wrong'
  
  // Handle specific error types
  if (props.error.statusCode === 404) {
    return 'Page not found'
  }
  
  if (props.error.statusCode === 403) {
    return 'Access denied'
  }
  
  if (props.error.statusCode === 500) {
    return 'Server error'
  }
  
  return props.error.message || 'Something went wrong'
})

const handleError = () => {
  clearError()
}

const goHome = () => {
  navigateTo(localePath('index'))
}
</script>

<style lang="scss" scoped>
.v-main {
  background: url('~/assets/background.jpg') 80% center/cover no-repeat;
}
</style> 