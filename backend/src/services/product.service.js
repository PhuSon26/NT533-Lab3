import Product from '../models/Product.js';
import { cacheGet, cacheSet, invalidateProductCache } from '../config/redis.js';
import { AppError } from '../utils/AppError.js';

export async function listProducts(params) {
  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(params.limit) || 12));
  const normalized = {
    page, limit,
    category: params.category || '',
    search: params.search ? String(params.search).slice(0, 100) : '',
    minPrice: params.minPrice ?? '',
    maxPrice: params.maxPrice ?? '',
    sort: params.sort || 'newest',
  };
  const cacheKey = `solemate:products:${JSON.stringify(normalized)}`;
  const cached = await cacheGet(cacheKey);
  if (cached) return cached;

  const filter = {};
  if (normalized.category) filter.category = normalized.category;
  if (normalized.search) filter.$text = { $search: normalized.search };
  if (normalized.minPrice !== '' || normalized.maxPrice !== '') {
    filter.price = {};
    if (normalized.minPrice !== '') filter.price.$gte = Number(normalized.minPrice);
    if (normalized.maxPrice !== '') filter.price.$lte = Number(normalized.maxPrice);
  }

  const sortMap = {
    newest: { createdAt: -1 },
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    name: { name: 1 },
  };
  const sort = sortMap[normalized.sort] || sortMap.newest;
  const [items, total] = await Promise.all([
    Product.find(filter).sort(sort).skip((page - 1) * limit).limit(limit).lean(),
    Product.countDocuments(filter),
  ]);
  const result = { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  await cacheSet(cacheKey, result, 60);
  return result;
}

export async function getProductById(id) {
  const cacheKey = `solemate:product:${id}`;
  const cached = await cacheGet(cacheKey);
  if (cached) return cached;
  const product = await Product.findById(id).lean();
  if (!product) throw new AppError('Product not found', 404);
  await cacheSet(cacheKey, product, 120);
  return product;
}

export async function createProduct(input) {
  const slug = input.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString(36);
  const product = await Product.create({ ...input, slug });
  await invalidateProductCache();
  return product;
}

export async function updateProduct(id, input) {
  const product = await Product.findByIdAndUpdate(id, input, { new: true, runValidators: true });
  if (!product) throw new AppError('Product not found', 404);
  await invalidateProductCache(id);
  return product;
}

export async function deleteProduct(id) {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new AppError('Product not found', 404);
  await invalidateProductCache(id);
}
