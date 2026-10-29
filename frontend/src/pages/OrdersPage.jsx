import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ArrowRight, PackageCheck } from 'lucide-react';
import { getMyOrders } from '../api/orders.js';
import { useAuth } from '../context/AuthContext.jsx';
import { money } from '../utils/format.js';
import Spinner from '../components/Spinner.jsx';

export default function OrdersPage() {
  const { user } = useAuth();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!user) return;
    getMyOrders().then((data) => setOrders(data.orders)).catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, [user]);
  if (!user) return <Navigate to="/login" replace/>;
  return <section className="section orders-page"><div className="eyebrow">YOUR SOLEMATE ACCOUNT</div><h1>Your <em>orders.</em></h1>
    {location.state?.placed && <div className="success-banner"><PackageCheck size={21}/><div><strong>Order placed — nice choice.</strong><p>Order #{location.state.placed._id.slice(-8).toUpperCase()} · Demo payment recorded.</p></div></div>}
    {loading ? <Spinner label="Fetching your orders"/> : error ? <div className="error-state">{error}</div> : !orders.length ? <div className="empty-state"><p>No orders yet. Your first favorite is waiting.</p><Link className="button button-dark" to="/products">Explore shoes <ArrowRight size={16}/></Link></div> :
      <div className="orders-list">{orders.map((order) => <article className="order-card" key={order._id}><div className="order-card-top"><div><span>ORDER / {order._id.slice(-8).toUpperCase()}</span><p>{new Date(order.createdAt).toLocaleDateString()}</p></div><span className={`status-pill status-${order.status}`}>{order.status}</span></div><div className="order-card-items">{order.items.map((item, i) => <div key={`${item.product}-${i}`}><img src={item.imageUrl} alt=""/><span>{item.name} · EU {item.size} × {item.quantity}</span><strong>{money(item.unitPrice * item.quantity)}</strong></div>)}</div><div className="order-card-bottom"><span>SIMULATED PAYMENT</span><strong>{money(order.total)}</strong></div></article>)}</div>}
  </section>;
}
