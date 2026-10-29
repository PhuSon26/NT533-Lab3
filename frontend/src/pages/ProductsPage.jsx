import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { getProducts } from '../api/products.js';
import ProductCard from '../components/ProductCard.jsx';
import Spinner from '../components/Spinner.jsx';

const categories = ['All', 'Running', 'Lifestyle', 'Basketball', 'Training'];

export default function ProductsPage() {
  const [filters, setFilters] = useState({ search: '', category: '', sort: 'newest', page: 1 });
  const [result, setResult] = useState({ items: [], pagination: { pages: 1, total: 0 } });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true); setError('');
    getProducts({ ...filters, limit: 12 })
      .then((data) => { if (active) setResult(data); })
      .catch((err) => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [filters]);

  function change(key, value) { setFilters((old) => ({ ...old, [key]: value, page: 1 })); }
  return <section className="catalog section">
    <div className="catalog-title"><div className="eyebrow">THE FULL ROTATION</div><h1>Find your <em>fit.</em></h1><p>Good shoes for all the places you haven't been yet.</p></div>
    <div className="catalog-tools"><div className="search-box"><Search size={18}/><input aria-label="Search shoes" placeholder="Search by name or style..." value={filters.search} onChange={(e) => change('search', e.target.value)}/>{filters.search && <button onClick={() => change('search', '')}>Clear</button>}</div><label className="sort-select"><SlidersHorizontal size={16}/><select aria-label="Sort products" value={filters.sort} onChange={(e) => change('sort', e.target.value)}><option value="newest">Newest first</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option><option value="name">Name A–Z</option></select></label></div>
    <div className="category-tabs">{categories.map((category) => <button key={category} className={(filters.category || 'All') === (category === 'All' ? 'All' : category) ? 'active' : ''} onClick={() => change('category', category === 'All' ? '' : category)}>{category}</button>)}</div>
    <div className="result-line"><span>{result.pagination.total} PAIRS TO EXPLORE</span><span>CURATED FOR EVERYDAY</span></div>
    {loading ? <Spinner label="Loading collection"/> : error ? <div className="error-state">{error}<button className="button button-dark" onClick={() => setFilters({ ...filters })}>Try again</button></div> : result.items.length ? <div className="product-grid">{result.items.map((product, i) => <ProductCard key={product._id} product={product} index={i}/>)}</div> : <div className="empty-state"><h3>No shoes found.</h3><p>Try another search or category.</p><button className="button button-dark" onClick={() => setFilters({ search: '', category: '', sort: 'newest', page: 1 })}>Clear filters</button></div>}
    {result.pagination.pages > 1 && <div className="pagination"><button disabled={filters.page <= 1} onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}>Previous</button><span>PAGE {filters.page} / {result.pagination.pages}</span><button disabled={filters.page >= result.pagination.pages} onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}>Next</button></div>}
  </section>;
}
