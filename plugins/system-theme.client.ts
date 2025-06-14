export default defineNuxtPlugin(() => {
  const { global } = useTheme()

  const updateTheme = (isDark: boolean) => {
    global.name.value = isDark ? 'dark' : 'light'
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  updateTheme(mediaQuery.matches)
  mediaQuery.addEventListener('change', e => updateTheme(e.matches))
})