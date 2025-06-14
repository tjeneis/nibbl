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
const redirectInfo = useSupabaseCookieRedirect()

watch(user, () => {
  if (user.value) {
    // Get redirect path, and clear it from the cookie
    const path = redirectInfo.pluck()
    // Redirect to the saved path, or fallback to home
    return navigateTo(path || '/') 
  }
}, { immediate: true })
</script> 