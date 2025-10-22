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
const { t } = useI18n()

definePageMeta({
  layout: 'login'
})

useHead({
  title: () => t('navigation.signIn'),
})

const user = useSupabaseUser()
const localePath = useLocalePath()

watch(user, () => {
  if (user.value) {
    return navigateTo(localePath('index')) 
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
.v-card {
  background-color: rgba(var(--v-theme-surface), 0.5);
  backdrop-filter: blur(10px);
}
</style>