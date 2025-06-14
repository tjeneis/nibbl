export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()

  // If we're on the login page and have a session, redirect to home
  if (to.path === '/login' && user.value) {
    return navigateTo('/')
  }

  // If we're not on the login page and don't have a session, redirect to login
  if (to.path !== '/login' && !user.value) {
    return navigateTo('/login')
  }
}) 