import { expect, test } from '@nuxt/test-utils/playwright'

test('should load the homepage', async ({ page, goto }) => {
  await goto('/en/', { waitUntil: 'domcontentloaded' })
  
  // Wait for the page to load and check if the app loads
  await expect(page).toHaveTitle(/Nibbl/)
  
  // Check if body is visible
  await expect(page.locator('body')).toBeVisible()
})

test('should be responsive', async ({ page, goto }) => {
  await goto('/en/', { waitUntil: 'domcontentloaded' })
  
  // Test mobile viewport
  await page.setViewportSize({ width: 375, height: 667 })
  await expect(page.locator('body')).toBeVisible()
  
  // Test desktop viewport
  await page.setViewportSize({ width: 1920, height: 1080 })
  await expect(page.locator('body')).toBeVisible()
})

test('should show login page when not authenticated', async ({ page, goto }) => {
  // Navigate to the correct localized route
  await goto('/en/login', { waitUntil: 'networkidle' })
  
  // Wait for the page to be fully loaded and stable
  await page.waitForLoadState('networkidle')
  
  // Check login page elements
  await expect(page).toHaveTitle(/Nibbl/)
  
  // Wait for the h1 element to be visible (contains the tagline)
  await expect(page.locator('h1')).toBeVisible()
  
  // Check for the sign-in button specifically
  await expect(page.locator('button').filter({ hasText: /sign in|aanmelden/i })).toBeVisible()
})
