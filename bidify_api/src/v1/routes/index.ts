import { Router } from 'express'
const router = Router()
import userRouter from './user.route'
import depositRouter from './deposit.route'
import bidRouter from './bid.route'

router.use('/users', userRouter)
router.use('/deposits', depositRouter)
router.use('/bids', bidRouter)

export default router
