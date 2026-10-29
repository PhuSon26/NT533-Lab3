import { validationResult } from 'express-validator';
import { AppError } from '../utils/AppError.js';

export function validate(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new AppError('Request validation failed', 400, result.array()));
  }
  next();
}
