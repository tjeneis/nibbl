<template>
  <VMenu location="bottom end">
    <template v-slot:activator="{ props }">
      <VBtn
        v-bind="props"
        icon
      >
        <VAvatar
          :image="user?.user_metadata?.avatar_url"
          :text="user?.email?.[0].toUpperCase()"
          color="primary"
        />
      </VBtn>
    </template>
    <VList>
      <VListItem>
        <VListItemTitle>{{ user?.email }}</VListItemTitle>
      </VListItem>
      <VDivider />
      <VListItem @click="showProfileSetup = true">
        <VListItemTitle>Edit Profile</VListItemTitle>
        <template v-slot:prepend>
          <VIcon>mdi-account-edit</VIcon>
        </template>
      </VListItem>
      <VListItem @click="toggleTheme">
        <VListItemTitle>{{ isDark ? 'Light Mode' : 'Dark Mode' }}</VListItemTitle>
        <template v-slot:prepend>
          <VIcon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</VIcon>
        </template>
      </VListItem>
      <VListItem @click="handleSignOut">
        <VListItemTitle>Sign Out</VListItemTitle>
        <template v-slot:prepend>
          <VIcon>mdi-logout</VIcon>
        </template>
      </VListItem>
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