import {
  HttpException,
  BadRequestException,
  ValidationException,
} from '@exceptions/HttpException'
import { DbException } from '@exceptions/DbException'
import { ICommonException } from '@interfaces/common.interface'
import { Response } from 'express'

export const handler = (err: any, res: Response) => {
  err.httpCode = err.httpCode || 500
  err.status = err.status || 'error'

  if (err.isAxiosError && err.response) {
    err.code = err.response?.statusText
    err.httpCode = err.response?.status
    err.message =
      err.response?.data?.message ||
      err.response?.data?.description ||
      err.response?.data?.error_description
  }

  if (err instanceof HttpException) {
    err.httpCode = err.httpCode || 500
    err.status = err.status || 'error'
  }

  if (err instanceof ValidationException) {
    err.httpCode = err.httpCode || 500
    err.status = err.status || 'error'
    err.code = err.code || 'VALIDATION_ERROR'
    err.errors = err.errors || []
  }

  if (err instanceof DbException || err instanceof BadRequestException) {
    err.httpCode = err.httpCode || 500
    err.code = err.code || 'UNKNOWN'
  }

  process.env.NODE_ENV === 'production'
    ? sendErrorProd(err, res)
    : sendErrorDev(err, res)
}

export const isOperational = (err: Error) => {
  if (err instanceof HttpException) {
    return err.isOperational
  }
  return false
}

const sendErrorDev = (err: ICommonException, res: Response) => {
  res.status(err.httpCode).json({
    message: err.message,
    error: err,
    ...(err.code && { code: err.code }),
    stack: err.stack,
  })
}

const sendErrorProd = (err: ICommonException, res: Response) => {
  res.status(err.httpCode).json({
    message: err.message,
    ...(err.code && { code: err.code }),
    ...(err.status && { status: err.status }),
  })
}
