import { expect, test } from '@nuxt/test-utils/playwright'

test('should load the homepage', async ({ page, goto }) => {
  await goto('/en/', { waitUntil: 'networkidle' })
  
  // Wait for the page to load and check if the app loads
  await expect(page).toHaveTitle(/Nibbl/)
  
  // Check if body is visible
  await expect(page.locator('body')).toBeVisible()
})

test('should be responsive', async ({ page, goto }) => {
  await goto('/en/', { waitUntil: 'networkidle' })
  
  // Test mobile viewport
  await page.setViewportSize({ width: 375, height: 667 })
  await expect(page.locator('body')).toBeVisible()
  
  // Test desktop viewport
  await page.setViewportSize({ width: 1920, height: 1080 })
  await expect(page.locator('body')).toBeVisible()
})

