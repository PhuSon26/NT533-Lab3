import { Router } from 'express';
import * as controller from '../controllers/product.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createProductRules, listProductRules, productIdRules } from '../validators/product.validators.js';

const router = Router();
router.get('/', listProductRules, validate, controller.list);
router.get('/:id', productIdRules, validate, controller.getOne);
router.post('/', requireAuth, requireRole('admin'), createProductRules, validate, controller.create);
router.patch('/:id', requireAuth, requireRole('admin'), productIdRules, validate, controller.update);
router.delete('/:id', requireAuth, requireRole('admin'), productIdRules, validate, controller.remove);
export default router;
