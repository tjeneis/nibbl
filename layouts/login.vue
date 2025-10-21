<template>
  <VMain class="height-screen">
    <slot />

    <div class="position-absolute top-0 right-0 pa-6 d-flex align-center justify-end ga-3">
      <LanguageSwitch />
      <ThemeToggle />
    </div>
  </VMain>
</template>

<style lang="scss" scoped>
.v-main {
  background: url('~/assets/background.jpg') center/cover no-repeat;
}
</style>