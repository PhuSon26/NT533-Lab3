import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { AppError } from '../utils/AppError.js';

export async function createOrder(userId, input) {
  if (!Array.isArray(input.items) || input.items.length === 0) {
    throw new AppError('Order must contain at least one item', 400);
  }
  const normalized = [];
  let total = 0;

  for (const item of input.items) {
    if (!mongoose.isValidObjectId(item.productId)) throw new AppError('Invalid product in order', 400);
    const product = await Product.findById(item.productId);
    if (!product) throw new AppError('A product in your cart no longer exists', 404);
    const quantity = Number(item.quantity);
    const size = Number(item.size);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) throw new AppError('Invalid item quantity', 400);
    if (!product.sizes.includes(size)) throw new AppError(`${product.name} is not available in size ${size}`, 400);
    if (product.stock < quantity) throw new AppError(`Not enough stock for ${product.name}`, 409);

    // Always calculate prices on the server; never trust prices sent by a browser.
    total += product.price * quantity;
    normalized.push({
      product: product._id, name: product.name, imageUrl: product.imageUrl,
      unitPrice: product.price, quantity, size,
    });
  }

  // This demo validates stock and snapshots prices. A production system should use
  // a MongoDB transaction and atomic stock updates to prevent concurrent overselling.
  const order = await Order.create({
    user: userId, items: normalized, total,
    shippingAddress: input.shippingAddress,
    paymentStatus: 'simulated',
  });
  return order;
}

export async function listMyOrders(userId) {
  return Order.find({ user: userId }).sort({ createdAt: -1 }).lean();
}
