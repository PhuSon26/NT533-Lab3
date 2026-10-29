import { request } from './client.js';

export function getProducts(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== undefined && value !== null) query.set(key, value);
  });
  return request(`/products${query.size ? `?${query}` : ''}`);
}
export function getProduct(id) {
  return request(`/products/${id}`);
}
