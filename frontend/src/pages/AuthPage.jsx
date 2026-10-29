import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Footprints } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function AuthPage({ mode = 'login' }) {
  const isRegister = mode === 'register';
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  if (user) return <Navigate to="/" replace/>;

  async function submit(event) {
    event.preventDefault(); setBusy(true); setError('');
    try {
      if (isRegister) await signUp(form); else await signIn({ email: form.email, password: form.password });
      navigate(location.state?.from || '/');
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <section className="auth-page"><div className="auth-art"><div className="auth-art-copy"><Footprints size={28}/><p>GOOD SHOES.<br/><em>GOOD DAYS.</em></p><span>FIND YOUR EVERYDAY FAVORITE.</span></div><img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000" alt="Red sneaker"/></div>
    <div className="auth-panel"><div className="eyebrow">{isRegister ? 'JOIN THE ROTATION' : 'WELCOME BACK'}</div><h1>{isRegister ? <>A good place<br/>to <em>start.</em></> : <>Good to have<br/>you <em>back.</em></>}</h1><p>{isRegister ? 'Create an account and keep your favorites close.' : 'Sign in to pick up where you left off.'}</p>
      <form className="auth-form" onSubmit={submit}>{isRegister && <label>YOUR NAME<input required minLength="2" maxLength="80" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" placeholder="Alex Morgan"/></label>}<label>EMAIL ADDRESS<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" placeholder="you@example.com"/></label><label>PASSWORD<input type="password" required minLength={isRegister ? 8 : 1} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} autoComplete={isRegister ? 'new-password' : 'current-password'} placeholder={isRegister ? 'At least 8 characters' : 'Your password'}/></label>
        {error && <div className="form-error" role="alert">{error}</div>}<button className="button button-dark auth-submit" disabled={busy}>{busy ? 'PLEASE WAIT…' : isRegister ? 'CREATE ACCOUNT' : 'SIGN IN'} <ArrowRight size={17}/></button></form>
      <p className="auth-switch">{isRegister ? 'Already part of the crew?' : 'New around here?'} <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Sign in' : 'Create an account'}</Link></p><span className="auth-footnote">YOUR DATA IS STORED IN YOUR LOCAL LEARNING DATABASE.</span>
    </div>
  </section>;
}
