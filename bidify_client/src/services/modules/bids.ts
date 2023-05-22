import { AxiosResponse } from 'axios'
import { request } from 'src/services/request'
import { API_LIST } from '../constants'
import { IBidItem, IBidItemResponse, IResponse } from '../interface'

export const getAllBidItemsService = async (): Promise<IBidItemResponse> => {
  const response: AxiosResponse | null = await request({
    method: 'GET',
    endpoint: API_LIST.BID_ITEMS,
  })

  return response?.data
}

export const createBidItemService = async (payload: IBidItem): Promise<IResponse> => {
  const response: AxiosResponse | null = await request({
    method: 'POST',
    endpoint: API_LIST.NEW_BID_ITEMS,
    body: { ...payload }
  })

  return response?.data
}

export const placeBidService = async (payload: { amount: number, bid_item_id: number }): Promise<IResponse> => {
  const response: AxiosResponse | null = await request({
    method: 'POST',
    endpoint: API_LIST.PLACE_BID,
    body: { ...payload }
  })

  return response?.data
}