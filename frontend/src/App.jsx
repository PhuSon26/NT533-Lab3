import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';

export default function App() {
  return <Routes><Route element={<Layout/>}>
    <Route index element={<HomePage/>}/>
    <Route path="products" element={<ProductsPage/>}/>
    <Route path="products/:id" element={<ProductDetailPage/>}/>
    <Route path="login" element={<AuthPage mode="login"/>}/>
    <Route path="register" element={<AuthPage mode="register"/>}/>
    <Route path="cart" element={<CartPage/>}/>
    <Route path="checkout" element={<CheckoutPage/>}/>
    <Route path="orders" element={<OrdersPage/>}/>
    <Route path="*" element={<section className="section empty-state"><h1>Page not found.</h1><a className="button button-dark" href="/">Back home</a></section>}/>
  </Route></Routes>;
}
