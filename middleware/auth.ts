export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  const localePath = useLocalePath()

  // If we're on the login page and have a session, redirect to home
  if (to.path.includes('login') && user.value) {
    return navigateTo(localePath('index'))
  }

  // If we're not on the login page and don't have a session, redirect to login
  if (!to.path.includes('login') && !user.value) {
    return navigateTo(localePath('login'))
  }
}) 