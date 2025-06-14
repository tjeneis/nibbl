<template>
  <VContainer class="fill-height">
    <VRow justify="center" align="center">
      <VCol cols="12" sm="8" md="6" lg="4">
        <VCard class="pa-4">
          <div class="text-center my-4">
            <Logo height="48" />
          </div>
          <VCardSubtitle class="text-center">
            Track your weight and body composition
          </VCardSubtitle>
          <VCardText>
            <VBtn
              block
              :color="buttonColor"
              size="large"
              :loading="loading"
              :disabled="loading"
              class="text-none letter-spacing-normal"
              @click="handleSignIn"
            >
              <img
                src="~/assets/Google__G__logo.svg"
                alt="Google"
                class="me-2"
                width="24"
                height="24"
              />
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

const theme = useTheme()
const buttonColor = computed(() => theme.global.current.value.dark ? 'white' : 'black')

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