import { Router } from 'express';
import * as controller from '../controllers/order.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);
router.post('/', controller.create);
router.get('/my', controller.mine);
export default router;
