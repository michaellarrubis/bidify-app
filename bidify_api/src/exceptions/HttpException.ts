export enum HttpExceptionCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

export class HttpException extends Error {
  httpCode = 500
  status: string
  isOperational: boolean

  constructor(message: string, httpCode: number) {
    super(message)

    this.httpCode = httpCode
    this.status = `${httpCode}`.startsWith('4') ? 'error' : 'fail'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export class BadRequestException extends HttpException {
  code: string

  constructor(code: string, message: string) {
    super(message, HttpExceptionCode.BAD_REQUEST)
    this.code = code
  }
}

export class ValidationException extends HttpException {
  errors: string[]
  code: string

  constructor(code: string, errors: string[]) {
    super('Invalid request', HttpExceptionCode.BAD_REQUEST)
    this.errors = errors
    this.code = code
  }
}
