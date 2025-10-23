/**
 * Error types and custom error classes for the application
 * Provides structured error handling with context and categorization
 */

/**
 * Enumeration of error types for categorization
 */
export enum ErrorType {
  /** Network-related errors (connection, timeout, etc.) */
  NETWORK = 'NETWORK',
  /** Validation errors (invalid input, missing required fields) */
  VALIDATION = 'VALIDATION',
  /** Authentication errors (not logged in, invalid credentials) */
  AUTHENTICATION = 'AUTHENTICATION',
  /** Authorization errors (insufficient permissions) */
  AUTHORIZATION = 'AUTHORIZATION',
  /** Resource not found errors (404) */
  NOT_FOUND = 'NOT_FOUND',
  /** Server-side errors (500, database errors) */
  SERVER = 'SERVER',
  /** Client-side errors (browser, JavaScript) */
  CLIENT = 'CLIENT',
  /** Unknown or unclassified errors */
  UNKNOWN = 'UNKNOWN'
}

/**
 * Interface defining the structure of application errors
 */
export interface AppError {
  /** Type of error for categorization */
  type: ErrorType
  /** Human-readable error message */
  message: string
  /** Optional error code for programmatic handling */
  code?: string | number
  /** Additional error details or data */
  details?: unknown
  /** Timestamp when the error occurred */
  timestamp: Date
  /** ID of the user who encountered the error (if applicable) */
  userId?: string
  /** Contextual information about where the error occurred */
  context?: {
    /** Component or module where the error occurred */
    component?: string
    /** Action being performed when error occurred */
    action?: string
    /** URL where the error occurred */
    url?: string
    /** User agent string for browser errors */
    userAgent?: string
  }
}

/**
 * Base custom error class with structured error information
 * Extends native Error with additional context and categorization
 */
export class CustomError extends Error {
  /** Type of error for categorization */
  public readonly type: ErrorType
  /** Optional error code for programmatic handling */
  public readonly code?: string | number
  /** Additional error details or data */
  public readonly details?: unknown
  /** Timestamp when the error occurred */
  public readonly timestamp: Date
  /** ID of the user who encountered the error (if applicable) */
  public readonly userId?: string
  /** Contextual information about where the error occurred */
  public readonly context?: AppError['context']

  /**
   * Create a new CustomError instance
   * @param type - Type of error for categorization
   * @param message - Human-readable error message
   * @param code - Optional error code for programmatic handling
   * @param details - Additional error details or data
   * @param userId - ID of the user who encountered the error
   * @param context - Contextual information about where the error occurred
   */
  constructor(
    type: ErrorType,
    message: string,
    code?: string | number,
    details?: unknown,
    userId?: string,
    context?: AppError['context']
  ) {
    super(message)
    this.name = 'CustomError'
    this.type = type
    this.code = code
    this.details = details
    this.timestamp = new Date()
    this.userId = userId
    this.context = context
  }
}

/**
 * Error class for validation-related errors
 * Used when user input fails validation rules
 */
export class ValidationError extends CustomError {
  /**
   * Create a new ValidationError instance
   * @param message - Human-readable validation error message
   * @param details - Additional validation details (e.g., field names, values)
   * @param context - Contextual information about where the validation failed
   */
  constructor(message: string, details?: unknown, context?: AppError['context']) {
    super(ErrorType.VALIDATION, message, 'VALIDATION_ERROR', details, undefined, context)
    this.name = 'ValidationError'
  }
}

/**
 * Error class for network-related errors
 * Used for connection issues, timeouts, and API failures
 */
export class NetworkError extends CustomError {
  /**
   * Create a new NetworkError instance
   * @param message - Human-readable network error message
   * @param code - Optional network error code (HTTP status, etc.)
   * @param details - Additional network error details
   * @param context - Contextual information about the network request
   */
  constructor(message: string, code?: string | number, details?: unknown, context?: AppError['context']) {
    super(ErrorType.NETWORK, message, code, details, undefined, context)
    this.name = 'NetworkError'
  }
}

/**
 * Error class for authentication-related errors
 * Used when user authentication fails or user is not logged in
 */
export class AuthenticationError extends CustomError {
  /**
   * Create a new AuthenticationError instance
   * @param message - Human-readable authentication error message
   * @param context - Contextual information about the authentication failure
   */
  constructor(message: string, context?: AppError['context']) {
    super(ErrorType.AUTHENTICATION, message, 'AUTH_ERROR', undefined, undefined, context)
    this.name = 'AuthenticationError'
  }
}
