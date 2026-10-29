import { createClient } from 'redis';
import { env } from './env.js';

export const redisClient = createClient({
  url: env.redisUrl,
  socket: {
    connectTimeout: 2000,
    reconnectStrategy: (retries) => (retries >= 2 ? new Error('Redis reconnect limit reached') : 500),
  },
});

redisClient.on('error', (error) => {
  console.warn(`[Redis] ${error.message}`);
});

export async function connectRedis() {
  try {
    await redisClient.connect();
    console.log('Redis connected');
  } catch (error) {
    console.warn(`[Redis] Not available; continuing without cache: ${error.message}`);
  }
}

export async function closeRedis() {
  if (redisClient.isOpen) {
    try {
      await redisClient.quit();
    } catch {
      redisClient.disconnect();
    }
  }
}

export async function cacheGet(key) {
  if (!redisClient.isReady) return null;
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.warn(`[Redis] Cache read failed: ${error.message}`);
    return null;
  }
}

export async function cacheSet(key, value, ttlSeconds = 60) {
  if (!redisClient.isReady) return;
  try {
    await redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds });
  } catch (error) {
    console.warn(`[Redis] Cache write failed: ${error.message}`);
  }
}

export async function invalidateProductCache(productId) {
  if (!redisClient.isReady) return;
  try {
    for await (const key of redisClient.scanIterator({ MATCH: 'solemate:products:*', COUNT: 100 })) {
      await redisClient.del(key);
    }
    if (productId) await redisClient.del(`solemate:product:${productId}`);
  } catch (error) {
    console.warn(`[Redis] Cache invalidation failed: ${error.message}`);
  }
}
