export interface ICommonColumns {
  id?: number
  created_at?: Date | string
  updated_at?: Date | string
}

interface IHttpException extends Error {
  httpCode: number
  status: string
  isOperational: boolean
}

interface IDbException extends Error {
  httpCode: number
  code: string
  isOperational: boolean
}

interface IValidationException extends IDbException {
  errors: string[]
}

export interface ICommonException
  extends IDbException,
    IHttpException,
    IValidationException {}