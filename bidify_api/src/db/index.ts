import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config'
import { Sequelize } from 'sequelize-typescript'

import UserModel from '@models/user.model'
import DepositModel from '@models/deposit.model'
import BidModel from '@models/bid.model'
import BidItemModel from '@models/bid_item.model'

const sequelize = new Sequelize({
  database: DB_DATABASE,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  dialect: 'mysql',
  pool: {
    min: 0,
    max: 5,
  },
  benchmark: true,
})

sequelize.addModels([
  UserModel,
  DepositModel,
  BidModel,
  BidItemModel
])

const DB = {
  sequelize,
  Sequelize,
}

export default DB
