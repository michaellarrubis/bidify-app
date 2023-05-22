import { ICommonColumns } from '@/interfaces/common.interface'

export interface IBidItem extends ICommonColumns {
  user_id: number
  name: string
  start_price: number
  current_price?: number
  time_window: Date | string
}

export interface IBid extends ICommonColumns {
  user_id: number
  bid_item_id: number
  amount: number
}