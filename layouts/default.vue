<template>
  <VApp>
    <VAppBar>
      <VAppBarTitle>Weighly</VAppBarTitle>
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