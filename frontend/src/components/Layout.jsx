import { Link, NavLink, Outlet } from 'react-router-dom';
import { ShoppingBag, Footprints, UserRound, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Layout() {
  const { user, signOut } = useAuth();
  const { count } = useCart();
  return <>
    <div className="announcement">COMPLIMENTARY SHIPPING ON ORDERS OVER $100</div>
    <header className="site-header">
      <Link className="brand" to="/"><span className="brand-mark"><Footprints size={22}/></span> sole<span>mate</span></Link>
      <nav className="main-nav"><NavLink to="/products">Shop all</NavLink><a href="/#story">Our story</a></nav>
      <div className="header-actions">
        {user ? <><span className="hello">Hi, {user.name.split(' ')[0]}</span><button className="icon-button" title="Sign out" onClick={signOut}><LogOut size={19}/></button></> : <Link className="icon-button" title="Sign in" to="/login"><UserRound size={20}/></Link>}
        <Link className="icon-button cart-link" title="Cart" to="/cart"><ShoppingBag size={20}/><span className="cart-count">{count}</span></Link>
      </div>
    </header>
    <main><Outlet /></main>
    <footer className="footer"><div className="footer-brand">solemate.</div><p>Move comfortably. Find your pace.</p><span>PERSONAL LEARNING PROJECT · MERN STACK</span></footer>
  </>;
}
