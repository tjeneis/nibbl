<template>
  <VAppBar>
    <VContainer fluid class="d-flex align-center ga-3">
      <Logo height="32" />

      <VSpacer />
      
      <VBtn
        variant="text"
        :size="mdAndUp ? 'default' : 'small'"
        @click="showAddDialog = true"
        :icon="mdAndUp ? undefined : 'mdi-plus'"
      >
        <template #prepend v-if="mdAndUp">
          <VIcon icon="mdi-plus" />
        </template>
        <template #default v-if="mdAndUp">
          {{ t('navigation.addEntry') }}
        </template>
      </VBtn>

      <UserMenu />
    </VContainer>
  </VAppBar>

  <VMain>
    <slot />
  </VMain>

  <AddEntryDialog
    v-model="showAddDialog"
    @saved="handleEntrySaved"
  />

  <ProfileSetupDialog
    v-model="showProfileSetup"
    :is-new-profile="isNewProfile"
    @saved="handleProfileSaved"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()

const showAddDialog = ref(false)
const showProfileSetup = ref(false)
const isNewProfile = ref(false)
const { mdAndUp } = useDisplay()
const { getProfile } = useProfile()

const handleEntrySaved = () => {
  showAddDialog.value = false
  // Refresh the weight entries
  refreshNuxtData('weight-entries')
}

const handleProfileSaved = () => {
  showProfileSetup.value = false
}

// Check if profile exists when app loads
onMounted(async () => {
  try {
    await getProfile()
  } catch (error) {
    // If profile doesn't exist, show setup dialog
    isNewProfile.value = true
    showProfileSetup.value = true
  }
})
</script>