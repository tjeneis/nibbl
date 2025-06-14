<template>
  <VApp>
    <VAppBar>
      <Logo height="32" class="ml-4" />

      <VSpacer />
      
      <VBtn
        color="primary"
        prepend-icon="mdi-plus"
        @click="showAddDialog = true"
      >
        Add Entry
      </VBtn>

      <UserMenu />
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
  </VApp>
</template>

<script setup lang="ts">
const showAddDialog = ref(false)
const showProfileSetup = ref(false)
const isNewProfile = ref(false)
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

<style>
.theme-logo {
  filter: brightness(0) saturate(100%) invert(var(--v-theme-on-surface));
}
</style>