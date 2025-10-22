/**
 * Authentication middleware for protected routes
 * Redirects unauthenticated users to the login page
 * 
 * This middleware checks if a user has an active Supabase session.
 * If no session exists, the user is redirected to the login page
 * with proper locale path handling for internationalization.
 * 
 * @example
 * // Apply to a page
 * definePageMeta({
 *   middleware: 'auth'
 * })
 */
export default defineNuxtRouteMiddleware((_to, _from) => {
  const session = useSupabaseSession()

  if (!session.value) {
    const localePath = useLocalePath()
    return navigateTo(localePath('login'))
  }
})