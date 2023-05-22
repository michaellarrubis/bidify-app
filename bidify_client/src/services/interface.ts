export interface IObjectPair {
  [key: string]: string | number | boolean | Date
}

export interface IHeaderObjectPair {
  [key: string]: string
}

export interface IRequest {
  endpoint: string
  method: string
  body?: IObjectPair
}

export interface IResponse {
  data: IObjectPair
  message: string
  statusCode: number
}

export interface IBidItemResponse {
  data: IBidItem[]
  message: string
  statusCode: number
}

export interface IUser {
  id: number
  email: string
  total_funds: number
  accessToken?: string
}

export interface IBidItem {
  id?: number
  user_id?: number
  name: string
  is_completed?: boolean
  start_price: number
  current_price?: number
  time_window: Date | string
}

export interface IDepositAmount {
  total_funds?: number
}