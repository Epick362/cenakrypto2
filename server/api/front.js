import { Router } from 'express'
import frontController from './../controllers/frontController'

const router = Router()

router.get('/front', frontController.index);
router.get('/list', frontController.list);
router.get('/coins', frontController.coins);

export default router
