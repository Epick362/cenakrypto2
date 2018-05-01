import { Router } from 'express'
import coinController from './../controllers/coinController'

const router = Router()

router.get('/coin/:coin', coinController.show);
router.get('/coin/:coin/history/:range', coinController.history);

export default router
