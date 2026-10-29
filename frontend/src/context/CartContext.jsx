import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'solemate_cart';

function readCart() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart);

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(items)), [items]);

  function addItem(product, size) {
    setItems((current) => {
      const found = current.find((item) => item.product._id === product._id && item.size === size);
      if (found) return current.map((item) =>
        item.product._id === product._id && item.size === size
          ? { ...item, quantity: Math.min(item.quantity + 1, 20) } : item);
      return [...current, { product, size, quantity: 1 }];
    });
  }
  function updateQuantity(productId, size, quantity) {
    if (quantity < 1) {
      setItems((current) => current.filter((item) => !(item.product._id === productId && item.size === size)));
      return;
    }
    setItems((current) => current.map((item) =>
      item.product._id === productId && item.size === size ? { ...item, quantity: Math.min(quantity, 20) } : item));
  }
  function removeItem(productId, size) {
    setItems((current) => current.filter((item) => !(item.product._id === productId && item.size === size)));
  }
  function clearCart() { setItems([]); }

  const total = useMemo(() => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [items]);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return <CartContext.Provider value={{ items, total, count, addItem, updateQuantity, removeItem, clearCart }}>{children}</CartContext.Provider>;
}
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
