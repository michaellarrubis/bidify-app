import DepositModel from '@/db/models/deposit.model'
import UserModel from '@/db/models/user.model'

import { HttpException } from '@exceptions/HttpException'
import { IDeposit } from '@/interfaces/deposit.interface'

export const addFunds = async ({ amount, user_id }: IDeposit): Promise<DepositModel | null> => {
  try {
    const user = await UserModel.findOne({ where: { id: user_id } })
    if (user) {
      const updatedRow = await user?.update({
        total_funds : amount + user.toJSON().total_funds,
      })
      if (updatedRow) return await DepositModel.create({ amount, user_id })
    }
    return await DepositModel.create({ amount, user_id })
  } catch (error) {
    throw new HttpException('Unable to add Funds', 500)
  }
}