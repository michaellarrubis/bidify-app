'use strict'
import {
  Table,
  Model,
  Column,
  AllowNull,
  DataType,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript'
import { IBid } from '@/interfaces/bid.interface'
import UserModel from '@models/user.model'
import BidItemModel from '@models/bid_item.model'

@Table({
  tableName: 'bids',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
})
export default class BidModel extends Model implements IBid {
  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
    user_id!: number

  @ForeignKey(() => BidItemModel)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
    bid_item_id!: number

  @AllowNull(false)
  @Column({ type: DataType.DECIMAL(10,2) })
    amount!: number

  @Column({ type: DataType.DATE })
    created_at?: Date

  @Column({ type: DataType.DATE })
    updated_at?: Date

  // Associations
  @BelongsTo(() => UserModel)
    user?: UserModel

  @BelongsTo(() => BidItemModel)
    bid_item?: BidItemModel
}