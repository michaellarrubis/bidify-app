import { Request, Response } from 'express'
import {
  createBidItem as createBidItemService,
  getBidItems as getBidItemsService,
  executeBid as executeBidService
} from '@services/bid.service'
import { findUserById } from '@/services/user.service'
import { findBidItemById } from '@services/bid.service'

import { IBidItem } from '@/interfaces/bid.interface'
import customResponse from '@/utils/customResponse'
import asyncWrapper from '@utils/asyncWrapper'

export const getBidItems = asyncWrapper(
  async (req: Request, res: Response) => {
    return customResponse(res, {
      statusCode: 200,
      data: await getBidItemsService()
    })
  }
)

export const createBidItem = asyncWrapper(
  async (req: Request, res: Response) => {
    const { name, start_price, time_window }: IBidItem = req.body

    if (!name || !start_price || !time_window) {
      return customResponse(res, {
        statusCode: 400,
        message: 'MISSING_BID_ITEM_PARAMETER'
      })
    }

    const bidItem = await createBidItemService({ name, start_price, time_window, user_id: req.user.id })
    if (bidItem) {
      return customResponse(res, {
        statusCode: 201,
        message: 'NEW_BID_ITEM_INSERTED'
      })
    }

    return customResponse(res, {
      statusCode: 400,
      message: 'FUNDS_NOT_INSERTED'
    })
  }
)

export const executeBid = asyncWrapper(
  async (req: Request, res: Response) => {
    const { amount, bid_item_id } = req.body

    if (!amount || amount === 0 || !bid_item_id) {
      return customResponse(res, {
        statusCode: 400,
        message: 'AMOUNT_OR_BID_ITEM_IS_MISSING'
      })
    }

    const user = await findUserById(req.user.id)
    if (user?.toJSON().total_funds < amount) {
      return customResponse(res, {
        statusCode: 400,
        message: 'AMOUNT_IS_BELOW_FUNDS'
      })
    }
    
    const bidItem = await findBidItemById(bid_item_id)
    const isOpenForBid = new Date() < new Date(bidItem?.toJSON().time_window)
    if (bidItem?.toJSON().current_price > user?.toJSON().total_funds) {
      return customResponse(res, {
        statusCode: 400,
        message: 'INSUFFICIENT_FUNDS'
      })
    }

    if (!isOpenForBid) {
      return customResponse(res, {
        statusCode: 400,
        message: 'BIDDING_WINDOW_IS_ALREADY_COMPLETED'
      })
    }

    const executeBid = await executeBidService({ user_id: req.user.id, bid_item_id, amount })
    if (executeBid) {
      return customResponse(res, {
        statusCode: 201,
        message: 'BID_IS_PLACED'
      })
    }

    return customResponse(res, {
      statusCode: 400,
      message: 'BID_IS_NOT_PLACED'
    })
  }
)