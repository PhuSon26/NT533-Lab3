import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { createOrder } from '../api/orders.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { money } from '../utils/format.js';

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: user?.name || '', address: '', city: '', phone: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  if (!user) return <Navigate to="/login" state={{ from: '/checkout' }} replace/>;
  if (!items.length) return <Navigate to="/cart" replace/>;

  async function submit(event) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      const data = await createOrder({
        items: items.map((item) => ({ productId: item.product._id, quantity: item.quantity, size: item.size })),
        shippingAddress: form,
      });
      clearCart();
      navigate('/orders', { state: { placed: data.order } });
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <section className="section checkout-page"><Link className="back-link" to="/cart"><ArrowLeft size={15}/> BACK TO BAG</Link><div className="eyebrow">ALMOST THERE</div><h1>Make it <em>yours.</em></h1><p className="checkout-disclaimer"><ShieldCheck size={16}/> Demo checkout — no real payment will be taken.</p>
    <div className="checkout-layout"><form className="checkout-form" onSubmit={submit}><h2>01 / Delivery details</h2><label>FULL NAME<input required maxLength="100" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}/></label><label>STREET ADDRESS<input required maxLength="200" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="House number and street"/></label><div className="form-row"><label>CITY<input required maxLength="100" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}/></label><label>PHONE<input required maxLength="30" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}/></label></div><h2>02 / Payment</h2><div className="fake-payment"><span>DEMO</span><div><strong>Simulated payment</strong><p>No card information is collected or charged.</p></div></div>{error && <div className="form-error" role="alert">{error}</div>}<button className="button button-dark auth-submit" disabled={busy}>{busy ? 'PLACING ORDER…' : 'PLACE DEMO ORDER'} <ArrowRight size={16}/></button></form>
      <aside className="order-summary"><span>YOUR ORDER</span>{items.map((item) => <div className="checkout-item" key={`${item.product._id}-${item.size}`}><img src={item.product.imageUrl} alt=""/><div><strong>{item.product.name}</strong><p>Size {item.size} · Qty {item.quantity}</p></div><b>{money(item.product.price * item.quantity)}</b></div>)}<div className="summary-total"><p>Subtotal</p><strong>{money(total)}</strong></div><div><p>Shipping</p><strong>{total >= 100 ? 'Free' : '$8'}</strong></div><div className="summary-total"><p>Total</p><strong>{money(total + (total >= 100 ? 0 : 8))}</strong></div></aside>
    </div>
  </section>;
}
