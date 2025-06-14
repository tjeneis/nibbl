<template>
  <VContainer class="fill-height">
    <VRow justify="center" align="center">
      <VCol cols="12" sm="8" md="6" lg="4">
        <VCard class="pa-4">
          <VCardText class="text-center">
            <VProgressCircular
              indeterminate
              color="primary"
              class="mb-4"
            />
            <p>Completing sign in...</p>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { useSupabaseUser } from '#imports'

definePageMeta({
  layout: 'login'
})

const user = useSupabaseUser()

// Watch for user changes and redirect when logged in
watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
}, { immediate: true })
</script> 