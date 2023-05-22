import app from './app'
import DB from './db'
import { PORT } from '@config'
import validateEnv from '@utils/validateEnv'

DB.sequelize
  .sync({ force: false })
  .catch((err) => {
    console.log('DB connection error: ', err)
  })
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  })

validateEnv()
