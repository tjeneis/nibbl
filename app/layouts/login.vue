<template>
  <VMain class="height-screen">
    <slot />

    <div class="position-absolute top-0 right-0 pa-3 pa-md-6 d-flex align-center justify-end ga-md-2">
      <LanguageSwitch color="white" />
      <ThemeToggle color="white" />
    </div>
  </VMain>
</template>

<style lang="scss" scoped>
.v-main {
  background: url('~/assets/background.jpg') 80% center/cover no-repeat;
}
</style>