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

      <ThemeToggle />
      <UserMenu />
    </VAppBar>

    <VMain>
      <slot />
    </VMain>

    <AddEntryDialog
      v-model="showAddDialog"
      @saved="handleEntrySaved"
    />
  </VApp>
</template>

<script setup lang="ts">
const showAddDialog = ref(false)

const handleEntrySaved = () => {
  showAddDialog.value = false
}
</script>

<style>
.theme-logo {
  filter: brightness(0) saturate(100%) invert(var(--v-theme-on-surface));
}
</style>