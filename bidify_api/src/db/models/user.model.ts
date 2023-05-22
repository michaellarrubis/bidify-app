'use strict'
import {
  Table,
  Model,
  Column,
  AllowNull,
  DataType,
  HasMany
} from 'sequelize-typescript'
import { IUser } from '@/interfaces/user.interface'
import DepositModel from '@models/deposit.model'
import BidModel from '@models/bid.model'
import BidItemModel from '@models/bid_item.model'

@Table({
  tableName: 'users',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
})
export default class UserModel extends Model implements IUser {
  @AllowNull(false)
  @Column({ type: DataType.STRING(45) })
    email!: string

  @AllowNull(false)
  @Column({ type: DataType.STRING(45) })
    password!: string

  @Column({ type: DataType.INTEGER })
    total_funds?: number

  @Column({ type: DataType.DATE })
    created_at?: Date

  @Column({ type: DataType.DATE })
    updated_at?: Date

  // Associations
  @HasMany(() => DepositModel)
    deposits?: DepositModel

  @HasMany(() => BidModel)
    bids?: BidModel

  @HasMany(() => BidItemModel)
    bid_items?: BidItemModel
}