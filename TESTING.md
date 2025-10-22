# Testing Setup

This project uses the official Nuxt testing utilities following the [Nuxt Testing Documentation](https://nuxt.com/docs/4.x/getting-started/testing).

## Test Structure

```
test/
├── e2e/           # End-to-end tests (Playwright)
│   └── app.spec.ts
├── nuxt/          # Tests requiring Nuxt runtime environment
│   ├── components/
│   │   └── LanguageSwitch.test.ts
│   └── composables/
│       └── useWeight.test.ts
└── unit/          # Pure unit tests (Node environment)
    └── utils.test.ts
```

## Running Tests

### All Tests
```bash
pnpm test
```

### Unit Tests Only (Fast, Node environment)
```bash
pnpm test:unit
```

### Nuxt Tests Only (Components, Composables)
```bash
pnpm test:nuxt
```

### End-to-End Tests
```bash
pnpm test:e2e
```

### Test Coverage
```bash
pnpm test:coverage
```

### Interactive Test UI
```bash
pnpm test:ui
```

## Test Types

### Unit Tests (`test/unit/`)
- Pure functions and utilities
- No Nuxt runtime required
- Fast execution
- Use standard Vitest patterns

### Nuxt Tests (`test/nuxt/`)
- Vue components with `mountSuspended`
- Composables that use Nuxt APIs
- Tests requiring Nuxt runtime environment
- Use `@nuxt/test-utils/runtime`

### E2E Tests (`test/e2e/`)
- Full application testing
- Browser automation with Playwright
- Use `@nuxt/test-utils/playwright`

## Key Features

- **Project-based testing**: Separate environments for different test types
- **Built-in mocks**: IntersectionObserver, IndexedDB
- **Nuxt integration**: Full Nuxt runtime in tests
- **TypeScript support**: Full type safety
- **Coverage reporting**: Built-in coverage with thresholds
- **CI/CD ready**: Optimized for continuous integration

## Writing Tests

### Component Tests
```typescript
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MyComponent from '~/components/MyComponent.vue'

test('renders component', async () => {
  const component = await mountSuspended(MyComponent)
  expect(component.text()).toContain('Expected text')
})
```

### Composable Tests
```typescript
import { useMyComposable } from '~/composables/useMyComposable'

test('composable works', () => {
  const { data, error } = useMyComposable()
  expect(data.value).toBeDefined()
})
```

### E2E Tests
```typescript
import { expect, test } from '@nuxt/test-utils/playwright'

test('page loads', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  await expect(page).toHaveTitle(/My App/)
})
```

## Configuration

- **Vitest**: `vitest.config.ts` - Project-based configuration
- **Playwright**: `playwright.config.ts` - Browser testing configuration
- **Nuxt**: `nuxt.config.ts` - Includes `@nuxt/test-utils/module`

## Coverage Thresholds

- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

These can be adjusted in `vitest.config.ts` based on project requirements.
