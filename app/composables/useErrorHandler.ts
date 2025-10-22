import type { AppError, ErrorType } from '~/types/errors'

export const useErrorHandler = () => {
  const errors = ref<AppError[]>([])
  const isOnline = ref(navigator.onLine)

  // Listen for online/offline events
  if (process.client) {
    window.addEventListener('online', () => {
      isOnline.value = true
    })
    
    window.addEventListener('offline', () => {
      isOnline.value = false
    })
  }

  const addError = (error: AppError) => {
    errors.value.push(error)
    
    // Log to console in development
    if (process.dev) {
      console.error('App Error:', error)
    }
    
    // Send to monitoring service in production
    if (process.prod) {
      sendToMonitoring(error)
    }
  }

  const clearErrors = () => {
    errors.value = []
  }

  const getErrorsByType = (type: ErrorType) => {
    return errors.value.filter(error => error.type === type)
  }

  const getLatestError = () => {
    return errors.value[errors.value.length - 1]
  }

  const sendToMonitoring = async (error: AppError) => {
    try {
      // In a real app, you would send this to Sentry, LogRocket, etc.
      await $fetch('/api/errors', {
        method: 'POST',
        body: error
      })
    } catch (monitoringError) {
      console.error('Failed to send error to monitoring:', monitoringError)
    }
  }

  const handleApiError = (error: any, context?: AppError['context']) => {
    let appError: AppError

    if (error.code === 'PGRST301' || error.message?.includes('JWT')) {
      appError = {
        type: 'AUTHENTICATION' as ErrorType,
        message: 'Authentication failed. Please sign in again.',
        code: error.code,
        details: error,
        timestamp: new Date(),
        context
      }
    } else if (error.code === 'PGRST116') {
      appError = {
        type: 'NOT_FOUND' as ErrorType,
        message: 'The requested resource was not found.',
        code: error.code,
        details: error,
        timestamp: new Date(),
        context
      }
    } else if (!isOnline.value) {
      appError = {
        type: 'NETWORK' as ErrorType,
        message: 'You are offline. Please check your connection.',
        code: 'OFFLINE',
        details: error,
        timestamp: new Date(),
        context
      }
    } else {
      appError = {
        type: 'SERVER' as ErrorType,
        message: error.message || 'An unexpected error occurred.',
        code: error.code,
        details: error,
        timestamp: new Date(),
        context
      }
    }

    addError(appError)
    return appError
  }

  const handleValidationError = (message: string, details?: any, context?: AppError['context']) => {
    const appError: AppError = {
      type: 'VALIDATION' as ErrorType,
      message,
      code: 'VALIDATION_ERROR',
      details,
      timestamp: new Date(),
      context
    }
    
    addError(appError)
    return appError
  }

  return {
    errors: readonly(errors),
    isOnline: readonly(isOnline),
    addError,
    clearErrors,
    getErrorsByType,
    getLatestError,
    handleApiError,
    handleValidationError
  }
}
