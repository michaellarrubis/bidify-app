import { ICommonColumns } from '@/interfaces/common.interface'

export interface IUser extends ICommonColumns{
  email: string
  password: string
  total_funds?: number
}