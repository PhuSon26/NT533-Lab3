import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { money } from '../utils/format.js';

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  return <section className="section cart-page"><div className="eyebrow">YOUR EVERYDAY EDIT</div><h1>Your <em>bag.</em></h1><p className="cart-subtitle">{items.length ? `${items.length} style${items.length === 1 ? '' : 's'} picked out just for you.` : 'A little room for something good.'}</p>
    {!items.length ? <div className="empty-state cart-empty"><p>Your bag is taking a breather.</p><Link className="button button-dark" to="/products">Explore the collection <ArrowRight size={16}/></Link></div> :
      <div className="cart-layout"><div className="cart-items">{items.map((item) => <article className="cart-item" key={`${item.product._id}-${item.size}`}><Link to={`/products/${item.product._id}`} className="cart-thumb"><img src={item.product.imageUrl} alt={item.product.name}/></Link><div className="cart-item-copy"><span>{item.product.brand}</span><Link to={`/products/${item.product._id}`}>{item.product.name}</Link><small>EU {item.size} · {money(item.product.price)}</small><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => updateQuantity(item.product._id, item.size, item.quantity - 1)}><Minus size={13}/></button><span>{item.quantity}</span><button aria-label="Increase quantity" onClick={() => updateQuantity(item.product._id, item.size, item.quantity + 1)}><Plus size={13}/></button></div></div><div className="cart-item-end"><strong>{money(item.product.price * item.quantity)}</strong><button className="remove-button" aria-label="Remove item" onClick={() => removeItem(item.product._id, item.size)}><Trash2 size={16}/></button></div></article>)}</div>
        <aside className="order-summary"><span>THE RECAP</span><div><p>Subtotal</p><strong>{money(total)}</strong></div><div><p>Shipping</p><strong>{total >= 100 ? 'Complimentary' : '$8'}</strong></div><div className="summary-total"><p>Estimated total</p><strong>{money(total + (total >= 100 ? 0 : 8))}</strong></div><p className="summary-note">Taxes calculated at checkout. This demo does not process real payments.</p><button className="button button-dark" onClick={() => navigate('/checkout')}>Continue to checkout <ArrowRight size={16}/></button><Link className="continue-shopping" to="/products">← Keep looking</Link></aside>
      </div>}
  </section>;
}
