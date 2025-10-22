/**
 * Composable for theme-based color utilities
 * Provides inverted colors based on the current theme
 */
export const useThemeColors = () => {
  const { global } = useTheme()

  /**
   * Get inverted color based on current theme
   * @param lightColor - Color to use in light theme (default: 'black')
   * @param darkColor - Color to use in dark theme (default: 'white')
   * @returns The appropriate color for the current theme
   */
  const getInvertedColor = (lightColor = 'black', darkColor = 'white') => {
    return global.name.value === 'dark' ? darkColor : lightColor
  }

  /**
   * Get inverted surface color for toolbars and cards
   * @returns Surface color that contrasts with the current theme
   */
  const getInvertedSurfaceColor = () => {
    return global.name.value === 'dark' ? 'white' : 'black'
  }

  /**
   * Check if current theme is dark
   * @returns true if dark theme is active
   */
  const isDark = computed(() => global.name.value === 'dark')

  /**
   * Check if current theme is light
   * @returns true if light theme is active
   */
  const isLight = computed(() => global.name.value === 'light')

  return {
    getInvertedColor,
    getInvertedSurfaceColor,
    isDark,
    isLight
  }
}
