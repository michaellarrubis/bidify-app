import { Router } from 'express'
const router = Router()

import {
  createBidItem,
  getBidItems,
  executeBid
} from '@controllers/bid.controller'
import { authenticate } from '@/middlewares/auth.middleware'

router.get('/bid-items', authenticate, getBidItems)
router.post('/new-bid-item', authenticate, createBidItem)
router.post('/place', authenticate, executeBid)

export default router
