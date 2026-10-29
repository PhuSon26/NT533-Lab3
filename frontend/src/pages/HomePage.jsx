import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowRight, MoveUpRight } from 'lucide-react';
import { getProducts } from '../api/products.js';
import ProductCard from '../components/ProductCard.jsx';
import Spinner from '../components/Spinner.jsx';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getProducts({ limit: 4, sort: 'newest' })
      .then((result) => setProducts(result.items))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  return <>
    <section className="hero">
      <div className="hero-copy"><div className="eyebrow"><span/> MADE FOR YOUR EVERYDAY</div>
        <h1>Find your<br/><em>own pace.</em></h1>
        <p>Shoes that move with you. Thoughtfully selected essentials for wherever the day takes you.</p>
        <div className="hero-actions"><Link className="button button-dark" to="/products">Explore collection <ArrowRight size={17}/></Link><a className="text-link" href="#new-arrivals">Discover more <ArrowDownRight size={16}/></a></div>
        <div className="hero-note"><span className="note-line"/> COMFORT IS A JOURNEY, NOT A DESTINATION</div>
      </div>
      <div className="hero-art"><div className="hero-circle circle-one"/><div className="hero-circle circle-two"/>
        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200" alt="Red running shoe" />
        <div className="floating-note"><span>01 / EVERYDAY</span><strong>Made to move.</strong><MoveUpRight size={19}/></div>
        <div className="hero-vertical">SOLE MATE · EST. 2025</div>
      </div>
      <div className="hero-index">01 <span/> 04</div>
    </section>
    <section className="ticker"><div>MOVE LIGHT <span>✳</span> LIVE FULL <span>✳</span> FIND YOUR PACE <span>✳</span> MOVE LIGHT <span>✳</span> LIVE FULL <span>✳</span></div></section>
    <section className="section collection-section" id="new-arrivals">
      <div className="section-heading"><div><div className="eyebrow">THE ROTATION</div><h2>Good things<br/><em>in motion.</em></h2></div><Link className="circle-link" to="/products">VIEW ALL <ArrowRight size={16}/></Link></div>
      {loading ? <Spinner label="Finding your next pair"/> : products.length ? <div className="product-grid">{products.map((product, i) => <ProductCard key={product._id} product={product} index={i}/>)}</div> : <p className="empty-state">No products yet. Start the backend and run the seed command.</p>}
    </section>
    <section className="story-section" id="story"><div className="story-image"><img src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1100" alt="Everyday sneakers" loading="lazy"/><span>BUILT FOR THE LONG WAY</span></div><div className="story-copy"><div className="eyebrow">A LITTLE LESS NOISE</div><h2>More miles.<br/><em>Less fuss.</em></h2><p>We believe the right pair doesn't ask for attention. It simply gets you out the door, through the day, and into whatever comes next.</p><Link className="text-link" to="/products">Find your pair <ArrowRight size={16}/></Link><div className="story-stamp">S<br/>M<span>®</span></div></div></section>
    <section className="bottom-cta"><p>YOUR NEXT EVERYDAY FAVORITE IS OUT THERE.</p><Link to="/products">Let's find it <ArrowRight size={17}/></Link></section>
  </>;
}
