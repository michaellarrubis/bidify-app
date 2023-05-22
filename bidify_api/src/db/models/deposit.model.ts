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
import { IDeposit } from '@/interfaces/deposit.interface'
import UserModel from '@models/user.model'

@Table({
  tableName: 'deposits',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
})
export default class DepositModel extends Model implements IDeposit {
  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
    user_id!: number

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
}