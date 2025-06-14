<template>
  <VMenu location="bottom end">
    <template v-slot:activator="{ props }">
      <VBtn
        v-bind="props"
        icon
      >
        <VAvatar
          :image="user?.user_metadata?.avatar_url"
        />
      </VBtn>
    </template>
    <VList>
      <VListItem class="px-5 pb-3" :title="user?.user_metadata?.full_name" :subtitle="user?.email" />
      <VDivider />
      <VListItem @click="showProfileSetup = true" prepend-icon="mdi-account-edit" title="Edit profile" />
      <VListItem @click="toggleTheme" :prepend-icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'" :title="isDark ? 'Light Mode' : 'Dark Mode'" />
      <VListItem @click="handleSignOut" prepend-icon="mdi-logout" title="Sign out" />
    </VList>
  </VMenu>

  <ProfileSetupDialog
    v-model="showProfileSetup"
    @saved="handleProfileSaved"
  />
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const client = useSupabaseClient()
const showProfileSetup = ref(false)
const { global } = useTheme()

const isDark = computed(() => global.name.value === 'dark')

function toggleTheme() {
  global.name.value = global.current.value.dark ? 'light' : 'dark'
}

const handleSignOut = async () => {
  await client.auth.signOut()
  navigateTo('/login')
}

const handleProfileSaved = () => {
  showProfileSetup.value = false
}
</script> 