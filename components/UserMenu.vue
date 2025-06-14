<template>
  <VMenu location="bottom end">
    <template v-slot:activator="{ props }">
      <VBtn
        v-bind="props"
        icon
        class="ml-2"
      >
        <VAvatar
          :image="user?.user_metadata?.avatar_url"
          :text="user?.email?.[0].toUpperCase()"
          size="32"
          color="primary"
        />
      </VBtn>
    </template>
    <VList>
      <VListItem>
        <VListItemTitle>{{ user?.email }}</VListItemTitle>
      </VListItem>
      <VDivider />
      <VListItem @click="handleSignOut">
        <VListItemTitle>Sign Out</VListItemTitle>
        <template v-slot:prepend>
          <VIcon>mdi-logout</VIcon>
        </template>
      </VListItem>
    </VList>
  </VMenu>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const client = useSupabaseClient()

const handleSignOut = async () => {
  await client.auth.signOut()
  navigateTo('/login')
}
</script> 