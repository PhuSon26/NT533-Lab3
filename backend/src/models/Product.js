import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 160, index: 'text' },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  brand: { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ['Running', 'Lifestyle', 'Basketball', 'Training'] },
  description: { type: String, required: true, maxlength: 2000 },
  price: { type: Number, required: true, min: 0 },
  imageUrl: { type: String, default: '' },
  sizes: [{ type: Number, min: 35, max: 50 }],
  stock: { type: Number, default: 0, min: 0 },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

productSchema.index({ category: 1, price: 1 });
export default mongoose.model('Product', productSchema);
