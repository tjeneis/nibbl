export default defineNuxtRouteMiddleware((_to, _from) => {
  const session = useSupabaseSession()

  if (!session.value) {
    const localePath = useLocalePath()
    return navigateTo(localePath('login'))
  }
})