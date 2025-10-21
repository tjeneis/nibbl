<template>
  <VRow class="fill-height" no-gutters align="center" justify="center">
    <VCol cols="auto">
      <VCard class="pa-6 pa-md-8 d-flex flex-column align-center justify-center ga-4" min-width="300">
        <VProgressCircular
          indeterminate
          color="primary"
        />
        <p>{{ t('auth.completingSignIn') }}</p>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import { useSupabaseUser } from '#imports'

const { t } = useI18n()

definePageMeta({
  layout: 'login'
})

const user = useSupabaseUser()
const redirectInfo = useSupabaseCookieRedirect()
const localePath = useLocalePath()

watch(user, () => {
  if (user.value) {
    // Get redirect path, and clear it from the cookie
    const path = redirectInfo.pluck()
    // Redirect to the saved path, or fallback to home
    return navigateTo(path || localePath('index')) 
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
.v-card {
  background-color: rgba(var(--v-theme-surface), 0.5);
  backdrop-filter: blur(10px);
}
</style>