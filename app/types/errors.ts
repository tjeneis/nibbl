export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  UNKNOWN = 'UNKNOWN'
}

export interface AppError {
  type: ErrorType
  message: string
  code?: string | number
  details?: any
  timestamp: Date
  userId?: string
  context?: {
    component?: string
    action?: string
    url?: string
    userAgent?: string
  }
}

export class CustomError extends Error {
  public readonly type: ErrorType
  public readonly code?: string | number
  public readonly details?: any
  public readonly timestamp: Date
  public readonly userId?: string
  public readonly context?: AppError['context']

  constructor(
    type: ErrorType,
    message: string,
    code?: string | number,
    details?: any,
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

export class ValidationError extends CustomError {
  constructor(message: string, details?: any, context?: AppError['context']) {
    super(ErrorType.VALIDATION, message, 'VALIDATION_ERROR', details, undefined, context)
    this.name = 'ValidationError'
  }
}

export class NetworkError extends CustomError {
  constructor(message: string, code?: string | number, details?: any, context?: AppError['context']) {
    super(ErrorType.NETWORK, message, code, details, undefined, context)
    this.name = 'NetworkError'
  }
}

export class AuthenticationError extends CustomError {
  constructor(message: string, context?: AppError['context']) {
    super(ErrorType.AUTHENTICATION, message, 'AUTH_ERROR', undefined, undefined, context)
    this.name = 'AuthenticationError'
  }
}
