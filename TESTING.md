# Testing Setup

This project uses Vitest for unit tests and Playwright for end-to-end testing, following modern testing best practices.

## Test Structure

```
test/
├── e2e/           # End-to-end tests (Playwright)
│   └── app.spec.ts
└── unit/          # Pure unit tests (Node environment)
    ├── utils.test.ts
    └── useHealthMetrics.test.ts
```

## Running Tests

### Unit Tests (Fast, Node environment)
```bash
pnpm test:unit
```

### End-to-End Tests
```bash
pnpm test:e2e
```

### All Tests
```bash
pnpm test:unit && pnpm test:e2e
```

## Test Types

### Unit Tests (`test/unit/`)
- Pure functions and utilities
- Composables with mocked dependencies
- Fast execution in Node environment
- Use standard Vitest patterns with comprehensive mocking

### E2E Tests (`test/e2e/`)
- Full application testing
- Browser automation with Playwright
- Use `@nuxt/test-utils/playwright`
- Test real user workflows

## Key Features

- **Comprehensive mocking**: Supabase, i18n, and Nuxt composables mocked for unit tests
- **Fast unit tests**: Pure Node environment for quick feedback
- **Real E2E testing**: Full browser automation with Playwright
- **TypeScript support**: Full type safety across all tests
- **Simplified setup**: Uses main `nuxt.config.ts` for both development and testing
- **CI/CD ready**: Optimized for continuous integration

## Writing Tests

### Unit Tests
```typescript
import { describe, it, expect, vi } from 'vitest'
import { useHealthMetrics } from '~/composables/useHealthMetrics'

// Mock dependencies
vi.mock('#app', () => ({
  useI18n: () => ({ t: (key: string) => key })
}))

describe('useHealthMetrics', () => {
  it('calculates BMI correctly', () => {
    const { calculateBMI } = useHealthMetrics()
    expect(calculateBMI(70, 1.75)).toBe(22.86)
  })
})
```

### E2E Tests
```typescript
import { expect, test } from '@nuxt/test-utils/playwright'

test('should load the homepage', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'domcontentloaded' })
  
  // Wait for the page to load and check if the app loads
  await expect(page).toHaveTitle(/Nibbl/)
  
  // Check if body is visible
  await expect(page.locator('body')).toBeVisible()
})
```

## Configuration

- **Vitest**: `vitest.config.ts` - Unit test configuration with Node environment
- **Playwright**: `playwright.config.ts` - E2E test configuration with Chromium
- **Nuxt**: `nuxt.config.ts` - Main config used for both development and testing

## Test Coverage

Current test coverage:
- **Unit Tests**: 56 tests covering utilities and composables
- **E2E Tests**: 2 tests covering basic app functionality

## Mocking Strategy

Unit tests use comprehensive mocking to isolate functionality:
- **Supabase**: Mocked client and user authentication
- **i18n**: Mocked translation functions
- **Nuxt Composables**: Mocked at module level for consistent behavior

## Git Ignore

Test artifacts are automatically ignored:
- `test-results/` - Playwright test results and screenshots
- `playwright-report/` - HTML test reports
