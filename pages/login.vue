<template>
  <VRow class="fill-height" no-gutters>
    <VCol md="4" class="pa-6 pa-md-8 d-flex flex-column">
      <div class="d-flex flex-grow-1 flex-column align-start justify-center ga-6">
        <Logo height="36" />

         <div class="d-flex flex-column ga-3">
           <h1 class="text-h4">
             {{ $t('app.tagline') }}
           </h1>
           <p class="text-medium-emphasis">
             {{ $t('app.description') }}
           </p>
         </div>

        <VBtn
          color="surface"
          size="large"
          :loading="loading"
          :disabled="loading"
          class="font-weight-medium px-4"
          @click="handleSignIn"
          :text="t('auth.signIn')"
        />
      </div>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
const { t } = useI18n()

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

<style lang="scss" scoped>
.v-col {
  background-color: rgba(var(--v-theme-surface), 0.5);
  backdrop-filter: blur(10px);
}
</style>