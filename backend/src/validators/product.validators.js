import { body, param, query } from 'express-validator';

export const listProductRules = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('minPrice').optional().isFloat({ min: 0 }),
  query('maxPrice').optional().isFloat({ min: 0 }),
];
export const productIdRules = [param('id').isMongoId().withMessage('Invalid product id')];
export const createProductRules = [
  body('name').trim().isLength({ min: 2, max: 160 }),
  body('brand').trim().notEmpty(),
  body('category').isIn(['Running', 'Lifestyle', 'Basketball', 'Training']),
  body('description').trim().notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('stock').optional().isInt({ min: 0 }),
  body('sizes').optional().isArray(),
];
