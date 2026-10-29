import { body } from 'express-validator';

export const registerRules = [
  body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Name must be 2–80 characters'),
  body('email').trim().isEmail().normalizeEmail().withMessage('A valid email is required'),
  body('password').isLength({ min: 8, max: 72 }).withMessage('Password must be 8–72 characters'),
];
export const loginRules = [
  body('email').trim().isEmail().normalizeEmail(),
  body('password').notEmpty(),
];
