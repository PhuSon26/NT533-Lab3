import { asyncHandler } from '../utils/asyncHandler.js';
import * as orderService from '../services/order.service.js';

export const create = asyncHandler(async (req, res) => {
  const order = await orderService.createOrder(req.user.id, req.body);
  res.status(201).json({ success: true, data: { order } });
});
export const mine = asyncHandler(async (req, res) => {
  res.json({ success: true, data: { orders: await orderService.listMyOrders(req.user.id) } });
});
