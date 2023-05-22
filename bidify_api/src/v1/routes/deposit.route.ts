import { Router } from 'express'
const router = Router()

import {
  addFunds
} from '@controllers/deposit.controller'
import { authenticate } from '@/middlewares/auth.middleware'

router.post('/add-funds', authenticate, addFunds)

export default router
