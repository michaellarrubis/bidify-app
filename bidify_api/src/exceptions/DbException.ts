export enum DbExceptionCode {
  REQUIRED = 'REQUIRED',
  NOT_FOUND = 'NOT_FOUND',
  DUPLICATE = 'DUPLICATE',
  UNKNOWN = 'UNKNOWN',
}

export class DbException extends Error {
  code: string
  httpCode = 400
  isOperational: boolean

  constructor(code: string, httpCode: number, message: string) {
    super(message)
    this.code = code
    this.httpCode = httpCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

export class SequelizeUniqueConstraintError extends DbException {
  constructor(message: string) {
    super(DbExceptionCode.DUPLICATE, 400, message)
  }
}

export class SequelizeValidationError extends DbException {
  constructor(message: string) {
    super(DbExceptionCode.REQUIRED, 400, message)
  }
}

export class SequelizeNotFoundError extends DbException {
  constructor(message: string) {
    super(DbExceptionCode.NOT_FOUND, 404, message)
  }
}
