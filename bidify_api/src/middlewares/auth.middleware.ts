import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
dotenv.config()

import { findUserByEmail } from '@/services/user.service'
import customResponse from '@/utils/customResponse'

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.headers.authorization &&
    req.headers.authorization?.split(' ')[0] !== 'Bearer'
  ) {
    return customResponse(res, {
      statusCode: 401,
      message: 'MISSING_AUTHORIZATION_TOKEN'
    })
  }

  const token = req.headers.authorization.split(' ')[1]
  if (!token) {
    return customResponse(res, {
      statusCode: 401,
      message: 'MISSING_AUTHORIZATION_TOKEN'
    })
  }

  try {
    const payload: any = await jwt.verify(token, process.env.SECRET_KEY as string)
    if (payload) {
      const user = await findUserByEmail(payload.email)
      if (!user) {
        return customResponse(res, {
          statusCode: 400,
          message: 'USER_NOT_EXIST'
        })
      }
      req.user = {
        id: payload.id,
        email: payload.email
      }
      next()
    } else {
      return customResponse(res, {
        statusCode: 401,
        message: 'INVALID_TOKEN'
      })
    }
  } catch (error) {
    return customResponse(res, {
      statusCode: 401,
      message: 'INVALID_TOKEN'
    })
  }
}

export const Auth = {
  authenticate,
}
