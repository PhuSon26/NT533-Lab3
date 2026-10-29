import { Router } from 'express';
import * as controller from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { registerRules, loginRules } from '../validators/auth.validators.js';

const router = Router();
router.post('/register', registerRules, validate, controller.register);
router.post('/login', loginRules, validate, controller.login);
router.get('/me', requireAuth, controller.me);
export default router;
