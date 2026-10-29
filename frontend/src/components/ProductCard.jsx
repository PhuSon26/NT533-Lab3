import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { money } from '../utils/format.js';

export default function ProductCard({ product, index = 0 }) {
  return <article className="product-card" style={{ animationDelay: `${index * 55}ms` }}>
    <Link className="product-image-wrap" to={`/products/${product._id}`}>
      <span className="product-category">{product.category}</span>
      {product.featured && <span className="product-badge">BESTSELLER</span>}
      <img className="product-image" src={product.imageUrl || 'https://placehold.co/700x600?text=SoleMate'} alt={product.name} loading="lazy"/>
      <span className="product-arrow"><ArrowUpRight size={18}/></span>
    </Link>
    <div className="product-info"><div><p className="product-brand">{product.brand}</p><Link to={`/products/${product._id}`} className="product-name">{product.name}</Link></div><strong>{money(product.price)}</strong></div>
    <p className="product-meta">{product.sizes?.length ? `Sizes ${product.sizes[0]}–${product.sizes[product.sizes.length - 1]}` : 'Everyday comfort'} <span>·</span> {product.stock > 0 ? 'In stock' : 'Sold out'}</p>
  </article>;
}
