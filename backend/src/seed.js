import { connectDatabase } from './config/db.js';
import Product from './models/Product.js';

const products = [
  { name: 'Cloud Runner 2', slug: 'cloud-runner-2', brand: 'SoleMate', category: 'Running', description: 'Lightweight everyday running shoes with a cushioned ride.', price: 129, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900', sizes: [38,39,40,41,42,43,44], stock: 18, featured: true },
  { name: 'Street Classic', slug: 'street-classic', brand: 'Northline', category: 'Lifestyle', description: 'Minimal sneakers designed for daily wear.', price: 89, imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=900', sizes: [38,39,40,41,42,43], stock: 25, featured: true },
  { name: 'Court Pro', slug: 'court-pro', brand: 'Baseline', category: 'Basketball', description: 'Supportive high-top shoes for quick changes of direction.', price: 149, imageUrl: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=900', sizes: [40,41,42,43,44,45], stock: 10, featured: false },
  { name: 'Lift Trainer', slug: 'lift-trainer', brand: 'SoleMate', category: 'Training', description: 'Stable training shoes for gym sessions and circuits.', price: 99, imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=900', sizes: [37,38,39,40,41,42,43], stock: 14, featured: false },
  { name: 'Retro Sprint', slug: 'retro-sprint', brand: 'Northline', category: 'Lifestyle', description: 'Retro-inspired profile with a modern comfortable fit.', price: 109, imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=900', sizes: [39,40,41,42,43,44], stock: 8, featured: true },
  { name: 'Trail Pace', slug: 'trail-pace', brand: 'Pathway', category: 'Running', description: 'Grippy shoes for park paths and light trail routes.', price: 119, imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900', sizes: [38,39,40,41,42,43,44,45], stock: 20, featured: false }
];

try {
  await connectDatabase();
  if (await Product.countDocuments() === 0) {
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);
  } else {
    console.log('Products collection is not empty; skipping seed');
  }
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  const mongoose = await import('mongoose');
  await mongoose.default.disconnect();
}
