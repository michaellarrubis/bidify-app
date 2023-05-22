import { AxiosResponse } from 'axios'
import { request } from 'src/services/request'
import { API_LIST } from '../constants'
import { IResponse } from '../interface'

export const registerUserService = async (payload: { email: string, password: string}): Promise<IResponse> => {
  const response: AxiosResponse | null = await request({
    method: 'AUTH',
    endpoint: API_LIST.REGISTER,
    body: payload
  })

  return response?.data
}

export const loginUserService = async (payload: { email: string, password: string}): Promise<IResponse> => {
  const response: AxiosResponse | null = await request({
    method: 'AUTH',
    endpoint: API_LIST.LOGIN,
    body: payload
  })

  return response?.data
}

export const depositFundsService = async (amount: number): Promise<IResponse> => {
  const response: AxiosResponse | null = await request({
    method: 'POST',
    endpoint: API_LIST.ADD_FUNDS,
    body: { amount }
  })

  return response?.data
}