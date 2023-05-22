import BidModel from '@models/bid.model'
import BidItemModel from '@models/bid_item.model'
import UserModel from '@models/user.model'

import { HttpException } from '@exceptions/HttpException'
import { IBid, IBidItem } from '@/interfaces/bid.interface'

export const findBidItemById = async (id: number): Promise<BidItemModel | null> => {
  try {
    return await BidItemModel.findOne({
      where: { id } 
    })
  } catch (error) {
    throw new HttpException('Unable to find user', 500)
  }
}

export const createBidItem = async ({ user_id, name, start_price, time_window }: IBidItem): Promise<BidItemModel | null> => {
  try {
    return await BidItemModel.create({ user_id, name, start_price, current_price: start_price, time_window })
  } catch (error) {
    console.log({ error })
    throw new HttpException('Unable to add Bid Item', 500)
  }
}

export const getBidItems = async (): Promise<Array<BidItemModel> | []> => {
  try {
    return await BidItemModel.findAll()
  } catch (error) {
    throw new HttpException('Unable to get Bid Item List', 500)
  }
}

export const executeBid = async ({ user_id, bid_item_id, amount }: IBid): Promise<BidModel | null> => {
  try {
    const bidCreated = await BidModel.create({ user_id, bid_item_id, amount })
    const user = await UserModel.findOne({ where: { id: user_id }})
    user?.update({
      total_funds: user?.toJSON().total_funds - amount
    })

    return bidCreated
  } catch (error) {
    throw new HttpException('Unable to place Bid', 500)
  }
}