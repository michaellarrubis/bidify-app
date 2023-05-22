import { ICommonColumns } from '@/interfaces/common.interface'

export interface IDeposit extends ICommonColumns{
  user_id: number
  amount: number
}