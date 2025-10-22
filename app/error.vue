<template>
  <VApp>
    <NuxtLayout name="login">
      <VRow class="fill-height" no-gutters justify="center" align="center">
        <VCol cols="auto">
          
          <VCard class="pa-6 pa-md-8 d-flex flex-column ga-3 align-center justify-center ga-4" min-width="300">
            <div class="d-flex flex-column ga-3 align-center justify-center">
              <h4 class="text-h4">
                {{ t('error.title') }}
              </h4>
              <p>
                {{ t('error.defaultMessage') }}
              </p>
            </div>

            <VBtn
              color="surface"
              variant="flat"
              class="font-weight-medium px-4"
              @click="goHome"
              :text="t('error.goHome')"
            />
          </VCard>
        </VCol>
      </VRow>
    </NuxtLayout>
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

const { t } = useI18n()
const localePath = useLocalePath()

// Handle error message display
const errorMessage = computed(() => {
  if (!props.error) return t('error.defaultMessage')
  
  // Handle specific error types
  if (props.error.statusCode === 404) {
    return t('error.pageNotFound')
  }
  
  if (props.error.statusCode === 403) {
    return t('error.accessDenied')
  }
  
  if (props.error.statusCode === 500) {
    return t('error.serverError')
  }
  
  return props.error.message || t('error.defaultMessage')
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

.v-card {
  background-color: rgba(var(--v-theme-surface), 0.5);
  backdrop-filter: blur(10px);
}
</style>