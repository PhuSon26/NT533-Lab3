import { request } from './client.js';

export const createOrder = (data) => request('/orders', { method: 'POST', body: JSON.stringify(data) });
export const getMyOrders = () => request('/orders/my');
