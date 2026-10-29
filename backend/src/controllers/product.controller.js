import { asyncHandler } from '../utils/asyncHandler.js';
import * as productService from '../services/product.service.js';

export const list = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await productService.listProducts(req.query) });
});
export const getOne = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { product: await productService.getProductById(req.params.id) } });
});
export const create = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: { product: await productService.createProduct(req.body) } });
});
export const update = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { product: await productService.updateProduct(req.params.id, req.body) } });
});
export const remove = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(204).end();
});
