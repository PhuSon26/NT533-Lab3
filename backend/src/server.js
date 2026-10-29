import app from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';
import { connectRedis, closeRedis } from './config/redis.js';

try {
  await connectDatabase();
  await connectRedis();
  const server = app.listen(env.port, () => console.log(`API listening on http://localhost:${env.port}`));
  const shutdown = (signal) => {
    console.log(`${signal} received; closing server`);
    server.close(async () => {
      await closeRedis();
      process.exit(0);
    });
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
} catch (error) {
  console.error('Application startup failed:', error.message);
  process.exit(1);
}
