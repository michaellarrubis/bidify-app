import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import {
  findUserByEmail,
  register as registerUser,
} from '@services/user.service'
import { IUser } from '@/interfaces/user.interface'
import customResponse from '@/utils/customResponse'
import asyncWrapper from '@utils/asyncWrapper'

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10)
}

const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash)
}

export const register = asyncWrapper(
  async (req: Request, res: Response) => {
    const userParams: IUser = req.body
    const user = await findUserByEmail(userParams.email)

    if (user) {
      return customResponse(res, {
        statusCode: 400,
        message: 'EMAIL_ALREADY_EXISTS'
      })
    }
    
    console.log('password: ', await hashPassword(userParams.password))
    let newUser = await registerUser({ ...userParams, password: await hashPassword(userParams.password), total_funds: 0 })
    if (newUser) {
      newUser = newUser.toJSON()

      const accessToken = jwt.sign({ id: newUser?.id, email: newUser?.email}, process.env.SECRET_KEY as string, { expiresIn: '1 days'})
      return customResponse(res, {
        statusCode: 200,
        data: {
          id: newUser?.id,
          email: newUser?.email,
          total_funds: newUser?.total_funds,
          accessToken
        }
      })
    }

    return customResponse(res, {
      statusCode: 400,
      message: 'USER_NOT_CREATED'
    })
  }
)

export const login = asyncWrapper(
  async (req: Request, res: Response) => {
    const userParams: IUser = req.body
    let user = await findUserByEmail(userParams.email)

    if (!user) {
      return customResponse(res, {
        statusCode: 400,
        message: 'USER_EMAIL_DOES_NOT_EXISTS'
      })
    }
    
    if (await comparePassword(userParams.password, user.toJSON().password)) {
      user = user.toJSON()

      const accessToken = jwt.sign({ id: user?.id, email: user?.email}, process.env.SECRET_KEY as string, { expiresIn: '1 days'})
      return customResponse(res, {
        statusCode: 200,
        data: {
          id: user?.id,
          email: user?.email,
          total_funds: user?.total_funds,
          accessToken
        }
      })
    }

    return customResponse(res, {
      statusCode: 400,
      message: 'EMAIL_PASSWORD_INCORRECT'
    })
  }
)

export const getUserByEmail = asyncWrapper(
  async (req: Request, res: Response) => {
    return customResponse(res, {
      statusCode: 200,
      data: {
        ...req.user
      }
    })
  }
)