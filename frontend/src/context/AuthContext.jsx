import { createContext, useContext, useEffect, useState } from 'react';
import * as authApi from '../api/auth.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('solemate_token')) { setLoading(false); return; }
    authApi.getMe()
      .then((data) => setUser(data.user))
      .catch(() => localStorage.removeItem('solemate_token'))
      .finally(() => setLoading(false));
  }, []);

  async function signIn(credentials) {
    const data = await authApi.login(credentials);
    localStorage.setItem('solemate_token', data.token);
    setUser(data.user);
  }
  async function signUp(details) {
    const data = await authApi.register(details);
    localStorage.setItem('solemate_token', data.token);
    setUser(data.user);
  }
  function signOut() {
    localStorage.removeItem('solemate_token');
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
