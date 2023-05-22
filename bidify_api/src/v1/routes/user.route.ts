import { Router } from 'express'
const router = Router()

import {
  register,
  login,
  getUserByEmail
} from '@controllers/user.controller'
import { authenticate } from '@/middlewares/auth.middleware'

router.post('/register', register)
router.post('/login', login)
router.get('/email', authenticate, getUserByEmail)

export default router
