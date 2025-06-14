<template>
  <VContainer class="fill-height">
    <VRow justify="center" align="center">
      <VCol cols="12" sm="8" md="6" lg="4">
        <VCard class="pa-4">
          <VCardTitle class="text-center text-h4 mb-4">
            Weighly
          </VCardTitle>
          <VCardSubtitle class="text-center mb-4">
            Track your weight and body composition
          </VCardSubtitle>
          <VCardText>
            <VBtn
              block
              color="primary"
              size="large"
              :loading="loading"
              :disabled="loading"
              @click="handleSignIn"
            >
              <VIcon start icon="mdi-google" />
              Sign in with Google
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import { useSupabaseClient } from '#imports'

definePageMeta({
  layout: 'login'
})

const supabase = useSupabaseClient()
const loading = ref(false)

const handleSignIn = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/confirm`
      }
    })
    if (error) throw error
  } catch (error) {
    console.error('Error signing in:', error)
  } finally {
    loading.value = false
  }
}
</script> 