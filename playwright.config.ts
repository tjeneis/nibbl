import { fileURLToPath } from 'node:url'
import { defineConfig, devices } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

export default defineConfig<ConfigOptions>({
  use: {
    nuxt: {
      rootDir: fileURLToPath(new URL('.', import.meta.url)),
    },
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  testDir: './test/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
})
