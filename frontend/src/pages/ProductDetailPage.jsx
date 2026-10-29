import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, ShoppingBag } from 'lucide-react';
import { getProduct } from '../api/products.js';
import { useCart } from '../context/CartContext.jsx';
import { money } from '../utils/format.js';
import Spinner from '../components/Spinner.jsx';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    let active = true;
    getProduct(id).then((data) => { if (active) { setProduct(data.product); setSize(data.product.sizes?.[0] ?? null); } })
      .catch((err) => { if (active) setError(err.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading) return <Spinner label="Loading shoe details"/>;
  if (error || !product) return <section className="section"><div className="error-state">{error || 'Product not found'}<Link className="text-link" to="/products">Back to collection</Link></div></section>;
  return <section className="detail-page section">
    <Link className="back-link" to="/products"><ArrowLeft size={16}/> BACK TO COLLECTION</Link>
    <div className="detail-layout"><div className="detail-image"><img src={product.imageUrl || 'https://placehold.co/900x800?text=SoleMate'} alt={product.name}/><span>SOLE MATE / {product.category.toUpperCase()}</span></div>
      <div className="detail-copy"><div className="eyebrow">{product.brand} · EVERYDAY SERIES</div><h1>{product.name}</h1><div className="detail-price">{money(product.price)}</div><p className="detail-description">{product.description}</p><div className="detail-rule"/>
        <div className="size-heading"><span>SELECT SIZE</span><span>EU / UNISEX</span></div>
        <div className="size-options">{product.sizes.map((s) => <button key={s} className={size === s ? 'selected' : ''} onClick={() => { setSize(s); setAdded(false); }}>{s}{size === s && <Check size={13}/>}</button>)}</div>
        <button className="button button-dark add-button" disabled={!size || product.stock < 1} onClick={() => { addItem(product, size); setAdded(true); }}><ShoppingBag size={17}/>{product.stock < 1 ? 'Currently unavailable' : added ? 'Added to bag' : 'Add to bag'} <span>{added ? '✓' : '↗'}</span></button>
        {added && <p className="success-message">Your pair is in the bag. <Link to="/cart">View bag</Link></p>}
        <div className="detail-perks"><p><span>01</span> Thoughtful everyday comfort</p><p><span>02</span> Complimentary shipping over $100</p><p><span>03</span> Stock available: {product.stock}</p></div>
      </div>
    </div>
  </section>;
}
