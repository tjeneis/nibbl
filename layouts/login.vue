<template>
  <VApp>
    <VImg
      src="~/assets/background.jpg"
      cover
      class="d-flex align-center justify-center"
    >
      <VMain>
        <slot />
      </VMain>
    </VImg>
  </VApp>
</template>

<style scoped>
.login-background {
  min-height: 100vh;
}
</style>