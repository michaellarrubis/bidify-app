import { Request, Response } from 'express'
import {
  addFunds as addFundsService,
} from '@services/deposit.service'
import customResponse from '@/utils/customResponse'
import asyncWrapper from '@utils/asyncWrapper'
import { findUserById } from '@/services/user.service'

export const addFunds = asyncWrapper(
  async (req: Request, res: Response) => {
    const { amount } = req.body
    console.log(req.body)

    if (!amount) {
      return customResponse(res, {
        statusCode: 400,
        message: 'AMOUNT_IS_REQUIRED'
      })
    }

    const funds = await addFundsService({ amount, user_id: req.user.id })
    if (funds) {
      const user = await findUserById(req.user.id)
      return customResponse(res, {
        statusCode: 201,
        message: 'NEW_FUNDS_INSERTED',
        data: {
          total_funds: user?.toJSON().total_funds
        }
      })
    }

    return customResponse(res, {
      statusCode: 400,
      message: 'FUNDS_NOT_INSERTED'
    })
  }
)