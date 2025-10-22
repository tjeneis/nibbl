<template>
  <VRow class="fill-height" no-gutters>
    <VCol md="4" class="pa-6 pa-md-8 d-flex flex-column">
      <div class="d-flex flex-grow-1 flex-column align-start justify-center ga-6">
        <Logo height="36" />

         <div class="d-flex flex-column ga-3">
           <h1 class="text-h4">
             {{ t('app.tagline') }}
           </h1>
           <p class="text-medium-emphasis">
             {{ t('app.description') }}
           </p>
         </div>

        <VBtn
          color="surface"
          :loading="loading"
          :disabled="loading"
          class="px-4"
          size="large"
          @click="handleSignIn"
          :text="t('auth.signIn')"
        />
      </div>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import type { Database } from '~/types/database.types'

definePageMeta({
  layout: 'login'
})

const { t } = useI18n()

useHead({
  title: () => t('navigation.signIn'),
})

const supabase = useSupabaseClient<Database>()
const localePath = useLocalePath()
const user = useSupabaseUser()
const loading = ref(false)

// Redirect authenticated users to home
watch(user, (newUser) => {
  if (newUser) {
    navigateTo(localePath('index'))
  }
}, { immediate: true })

const handleSignIn = async () => {
  try {
    loading.value = true
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}${localePath('confirm')}`
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

<style lang="scss" scoped>
.v-col {
  background-color: rgba(var(--v-theme-surface), 0.5);
  backdrop-filter: blur(10px);
}
</style>