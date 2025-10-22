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
    <VList min-width="230">
      <VListItem class="px-5 pb-3" :title="user?.user_metadata?.full_name" :subtitle="user?.email" />
      <VDivider />
      <VListItem @click="showProfileSetup = true" prepend-icon="mdi-account-edit" :title="t('navigation.editProfile')" />
      <VListItem @click="toggleTheme" :prepend-icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'" :title="isDark ? t('navigation.lightMode') : t('navigation.darkMode')" />
      <VListItem @click="handleSignOut" prepend-icon="mdi-logout" :title="t('auth.signOut')" />
    </VList>
  </VMenu>

  <ProfileSetupDialog
    v-model="showProfileSetup"
    @saved="handleProfileSaved"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()

const user = useSupabaseUser()
const client = useSupabaseClient()
const showProfileSetup = ref(false)
const { global } = useTheme()
const localePath = useLocalePath()

const isDark = computed(() => global.name.value === 'dark')

function toggleTheme() {
  global.name.value = global.current.value.dark ? 'light' : 'dark'
}

const handleSignOut = async () => {
  await client.auth.signOut()
  navigateTo(localePath('login'))
}

const handleProfileSaved = () => {
  showProfileSetup.value = false
}
</script> 