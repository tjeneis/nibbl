<template>
  <VApp>
    <NuxtLayout name="login">
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
                  {{ error?.message || 'Something went wrong' }}
                </p>
                <VBtn
                  color="primary"
                  @click="handleError"
                >
                  Try Again
                </VBtn>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VContainer>
    </NuxtLayout>
  </VApp>
</template>

<script setup lang="ts">
defineProps<{
  error: Error
}>()

const handleError = () => {
  clearError()
}
</script> 