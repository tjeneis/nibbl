import { expect, test } from '@nuxt/test-utils/playwright'

test('should load the homepage', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  
  // Check if the app loads
  await expect(page).toHaveTitle(/Nibbl/)
})

test('should show login when not authenticated', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  
  // Should redirect to login or show login form
  await expect(page.getByText('Sign in')).toBeVisible()
})

test('should be responsive', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  
  // Test mobile viewport
  await page.setViewportSize({ width: 375, height: 667 })
  await expect(page.locator('body')).toBeVisible()
  
  // Test desktop viewport
  await page.setViewportSize({ width: 1920, height: 1080 })
  await expect(page.locator('body')).toBeVisible()
})

test('should have proper meta tags', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  
  // Check for essential meta tags
  await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute('content', 'light dark')
})

test('should handle language switching', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  
  // Look for language switch component
  const languageSwitch = page.locator('[data-testid="language-switch"]')
  if (await languageSwitch.isVisible()) {
    await languageSwitch.click()
    // Test language switching functionality
  }
})
