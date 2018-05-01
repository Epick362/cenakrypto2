import { Router } from 'express'

import coins from './coins'
import front from './front'

const router = Router()

router.use(coins)
router.use(front)

export default router
