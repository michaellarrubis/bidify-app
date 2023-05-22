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
import { IBidItem } from '@/interfaces/bid.interface'
import UserModel from '@models/user.model'

@Table({
  tableName: 'bid_items',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
})
export default class BidItemModel extends Model implements IBidItem {
  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
    user_id!: number

  @AllowNull(false)
  @Column({ type: DataType.STRING(45) })
    name!: string
  
  @AllowNull(false)
  @Column({ type: DataType.DECIMAL(10,2) })
    start_price!: number

  @AllowNull(false)
  @Column({ type: DataType.DECIMAL(10,2) })
    current_price!: number

  @AllowNull(false)
  @Column({ type: DataType.DATE })
    time_window!: Date

  @Column({ type: DataType.DATE })
    created_at?: Date

  @Column({ type: DataType.DATE })
    updated_at?: Date

  // Associations
  @BelongsTo(() => UserModel)
    user?: UserModel
}