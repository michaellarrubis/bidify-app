import { IUser } from '@/interfaces/user.interface'
import UserModel from '@/db/models/user.model'
import { HttpException } from '@exceptions/HttpException'

export const findUserByEmail = async (email: string): Promise<UserModel | null> => {
  try {
    return await UserModel.findOne({
      where: { email } 
    })
  } catch (error) {
    throw new HttpException('Unable to find user', 500)
  }
}

export const findUserById = async (id: number): Promise<UserModel | null> => {
  try {
    return await UserModel.findOne({
      where: { id } 
    })
  } catch (error) {
    throw new HttpException('Unable to find user', 500)
  }
}

export const register = async (data: IUser): Promise<UserModel | null> => {
  try {
    return await UserModel.create({ ...data })
  } catch (error) {
    console.log(error)
    throw new HttpException('Unable to register user', 500)
  }
}