# Testing & Deployment Workflow

This document explains how automated testing works before deployment on Vercel.

## Overview

The project uses GitHub Actions to run comprehensive tests before any deployment to Vercel. This ensures code quality and prevents broken code from reaching production.

## Test Suite

The project includes three types of tests:

### 1. Unit Tests (`test:unit`)
- **Location**: `test/unit/`
- **Framework**: Vitest
- **Purpose**: Test individual functions and utilities
- **Command**: `pnpm test:unit`

### 2. Nuxt Component Tests (`test:nuxt`)
- **Location**: `test/nuxt/`
- **Framework**: Vitest + Nuxt Test Utils
- **Purpose**: Test Vue components with Nuxt context
- **Command**: `pnpm test:nuxt`

### 3. End-to-End Tests (`test:e2e`)
- **Location**: `test/e2e/`
- **Framework**: Playwright
- **Purpose**: Test complete user workflows
- **Command**: `pnpm test:e2e`

## Automated Testing Workflow

### GitHub Actions Pipeline

The `.github/workflows/test.yml` file defines the automated testing process:

#### Node.js Version Strategy

The workflow tests on multiple Node.js versions for comprehensive compatibility:

- **Node.js 20.x**: Current stable version, matches Vercel's default runtime
- **Node.js 22.x**: Latest LTS version, ensures future compatibility

This multi-version approach:
- Catches version-specific bugs early
- Validates dependency compatibility across versions
- Ensures smooth transitions when upgrading Node.js
- Tests performance differences between versions

1. **Trigger Events**:
   - Push to `main` or `develop` branches
   - Pull requests to `main` or `develop` branches

2. **Test Job**:
   - Runs on Ubuntu with Node.js 20.x and 22.x
   - Installs dependencies using pnpm
   - Runs all three test suites sequentially
   - Uploads test results as artifacts

3. **Build Test Job**:
   - Runs after tests pass
   - Verifies the application builds successfully
   - Uploads build artifacts

### Local Testing

You can run tests locally using these commands:

```bash
# Run all tests
pnpm test:ci

# Run specific test types
pnpm test:unit      # Unit tests only
pnpm test:nuxt      # Component tests only
pnpm test:e2e       # E2E tests only

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run E2E tests with UI
pnpm test:e2e:ui
```

## Vercel Integration

### Configuration

The `vercel.json` file is configured to:
- Use pnpm for dependency management with frozen lockfile
- Specify the correct build command (`pnpm build`)
- Set up cron jobs for scheduled tasks
- Configure serverless functions with Node.js 20.x runtime
- Set production environment variables

### Deployment Process

1. **Push to Repository**: Code is pushed to GitHub
2. **GitHub Actions**: Tests run automatically
3. **Vercel Deployment**: If tests pass, Vercel deploys the application
4. **Production**: Application is live on Vercel

### Branch Protection

To ensure quality, consider setting up branch protection rules:

1. Go to your GitHub repository settings
2. Navigate to "Branches"
3. Add a rule for `main` branch
4. Enable "Require status checks to pass before merging"
5. Select the "Test Suite" check

## Environment Variables

Make sure to configure the following environment variables in Vercel:

- `NODE_ENV`: Set to `production`
- Any Supabase or other service credentials
- API keys and secrets

## Troubleshooting

### Test Failures

If tests fail in GitHub Actions:

1. Check the Actions tab in your GitHub repository
2. Review the test output for specific failures
3. Download test artifacts for detailed reports
4. Fix issues locally and push again

#### Common Issues

**Native Binding Errors (oxc-parser)**
If you see errors like "Cannot find native binding" or "Cannot find module '@oxc-parser/binding-linux-x64-gnu'", this is a known issue with Nuxt 4's oxc-parser dependency in CI environments. The workflow includes automatic fixes:

- `pnpm rebuild oxc-parser` - Rebuilds native bindings
- `pnpm add oxc-parser@latest --force` - Reinstalls if rebuild fails

The `.npmrc` file also helps with dependency resolution in CI environments.

### Build Failures

If the build fails on Vercel:

1. Check the Vercel deployment logs
2. Ensure all dependencies are properly installed
3. Verify environment variables are set correctly
4. Check for TypeScript or linting errors

### Local Test Issues

If tests fail locally:

1. Ensure all dependencies are installed: `pnpm install`
2. Check Node.js version compatibility
3. Clear cache: `pnpm test:run --reporter=verbose`
4. For E2E tests, ensure browsers are installed: `pnpm exec playwright install`

## Best Practices

1. **Write Tests First**: Follow TDD principles when possible
2. **Keep Tests Fast**: Unit tests should be quick, E2E tests can be slower
3. **Test Coverage**: Aim for good test coverage of critical functionality
4. **Regular Updates**: Keep test dependencies up to date
5. **Monitor Results**: Check test results regularly and fix failing tests promptly
6. **Version Compatibility**: Test on multiple Node.js versions to ensure broad compatibility
7. **CI/CD Integration**: Always run tests before deployment to catch issues early

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Nuxt Testing Guide](https://nuxt.com/docs/guide/going-further/testing)
- [Vercel Deployment Guide](https://vercel.com/docs/deployments/overview)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
