import '@testing-library/jest-dom'
import { createVuetify } from 'vuetify'
import { createI18n } from 'vue-i18n'

// Setup Vuetify
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  }
})

// Setup i18n
const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      app: { title: 'Nibbl' },
      navigation: { addEntry: 'Add Entry' },
      profile: { requiredFields: 'Required fields' },
      error: {
        title: 'Oops! Something went wrong',
        defaultMessage: 'An unexpected error occurred. Please try again.',
        networkMessage: 'Please check your internet connection and try again.',
        authMessage: 'Your session has expired. Please sign in again.',
        retry: 'Try Again',
        goHome: 'Go Home'
      }
    }
  }
})

// Global test configuration
global.vuetify = vuetify
global.i18n = i18n
