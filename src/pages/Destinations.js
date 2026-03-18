import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import BookingModal from '../components/BookingModal';
import { destinations } from '../data';

const Destinations = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toggle, isWished } = useWishlist();
  const { addToast } = useToast();

  const [activeRegion, setActiveRegion] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [selected, setSelected] = useState(null);
  const [booking, setBooking] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid | list

  useEffect(() => {
    if (window.AOS) window.AOS.refresh();
    window.scrollTo(0, 0);
  }, []);

  const regions    = ['All', 'Europe', 'Asia', 'Americas', 'Africa'];
  const categories = ['All', 'Islands', 'Cultural', 'Adventure', 'Scenic'];

  const filtered = destinations
    .filter(d => activeRegion === 'All' || d.region === activeRegion)
    .filter(d => activeCategory === 'All' || d.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'rating')     return b.rating - a.rating;
      if (sortBy === 'price-asc')  return parseInt(a.price.replace(/\D/g,'')) - parseInt(b.price.replace(/\D/g,''));
      if (sortBy === 'price-desc') return parseInt(b.price.replace(/\D/g,'')) - parseInt(a.price.replace(/\D/g,''));
      if (sortBy === 'name')       return a.name.localeCompare(b.name);
      return 0;
    });

  const border = isDark ? '#2E2E2E' : '#E8E0D5';
  const cardBg = isDark ? '#1E1E1E' : '#FFFFFF';
  const textPrimary = isDark ? '#E8E8E8' : '#1A1A1A';
  const textMuted = isDark ? '#9A9A9A' : '#6B6B6B';

  return (
    <div style={{ background: isDark ? '#0D0D0D' : '#F8F4EF', color: textPrimary }}>
      {booking && <BookingModal item={booking} type="destination" onClose={() => setBooking(null)} />}

      {/* HERO */}
      <section style={{ position: 'relative', height: '60vh', display: 'flex', alignItems: 'flex-end', paddingBottom: '80px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.72))' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
          <span className="section-label text-gold" data-aos="fade-up">Explore the World</span>
          <h1 className="hero-title" style={{ color: '#fff', fontSize: 'clamp(2.5rem,5vw,4.5rem)', marginTop: '12px' }} data-aos="fade-up" data-aos-delay="150">
            Global Destinations
          </h1>
        </div>
      </section>

      {/* FILTERS */}
      <div style={{
        position: 'sticky', top: '72px', zIndex: 30, padding: '14px 2rem',
        background: isDark ? 'rgba(13,13,13,0.97)' : 'rgba(248,244,239,0.97)',
        backdropFilter: 'blur(20px)', borderBottom: `1px solid ${border}`,
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: textMuted, marginRight: '6px' }}>Region:</span>
            {regions.map(r => <button key={r} onClick={() => setActiveRegion(r)} className={`filter-btn ${activeRegion === r ? 'active' : ''}`}>{r}</button>)}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: textMuted, marginRight: '6px' }}>Type:</span>
            {categories.map(c => <button key={c} onClick={() => setActiveCategory(c)} className={`filter-btn ${activeCategory === c ? 'active' : ''}`}>{c}</button>)}
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="filter-btn" style={{ background: isDark ? '#0D0D0D' : '#F8F4EF', color: textMuted, cursor: 'pointer' }}>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="name">Name A–Z</option>
            </select>
            {/* View toggle */}
            <div style={{ display: 'flex', border: `1px solid ${border}` }}>
              {['grid','list'].map(v => (
                <button key={v} onClick={() => setViewMode(v)} style={{
                  padding: '7px 12px', background: viewMode === v ? '#C9A96E' : 'transparent',
                  color: viewMode === v ? '#0D0D0D' : textMuted,
                  border: 'none', cursor: 'pointer', fontSize: '0.75rem', transition: 'all 0.2s',
                }}>
                  <i className={`fas fa-${v === 'grid' ? 'th' : 'list'}`}></i>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GRID */}
      <section style={{ padding: '48px 2rem', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ fontSize: '0.8rem', color: textMuted, marginBottom: '24px' }}>
          Showing <span style={{ color: '#C9A96E', fontWeight: 600 }}>{filtered.length}</span> destinations
        </div>

        {viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {filtered.map((dest, i) => (
              <div key={dest.id} data-aos="fade-up" data-aos-delay={Math.min(i * 80, 400)}>
                <div
                  className="card-hover"
                  style={{ cursor: 'pointer', borderRadius: '2px', overflow: 'hidden' }}
                  onClick={() => setSelected(selected?.id === dest.id ? null : dest)}
                >
                  {/* Image */}
                  <div className="img-overlay" style={{ height: '300px' }}>
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" loading="lazy" />
                    {/* Heart */}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggle(dest);
                        addToast(isWished(dest.id) ? `${dest.name} removed from wishlist` : `${dest.name} saved to wishlist`, isWished(dest.id) ? 'info' : 'success');
                      }}
                      style={{
                        position: 'absolute', top: '12px', right: '12px', zIndex: 20,
                        width: '34px', height: '34px', borderRadius: '50%',
                        background: 'rgba(0,0,0,0.55)', border: 'none',
                        color: isWished(dest.id) ? '#E87070' : '#fff',
                        cursor: 'pointer', fontSize: '0.85rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.25s',
                      }}
                    >
                      <i className={`fa${isWished(dest.id) ? 's' : 'r'} fa-heart`}></i>
                    </button>
                    <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '18px' }}>
                      <div className="tag" style={{ marginBottom: '8px', width: 'fit-content' }}>{dest.category}</div>
                      <h3 style={{ color: '#fff', fontFamily: "'Cormorant Garamond',serif", fontSize: '1.25rem', fontWeight: 400, marginBottom: '6px' }}>{dest.name}</h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <i className="fas fa-star" style={{ color: '#C9A96E', fontSize: '0.7rem' }}></i>
                          <span style={{ color: '#fff', fontSize: '0.78rem' }}>{dest.rating} ({dest.reviews})</span>
                        </div>
                        <span style={{ color: '#C9A96E', fontWeight: 700, fontSize: '0.9rem' }}>{dest.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded */}
                  {selected?.id === dest.id && (
                    <div style={{ padding: '16px', background: cardBg, borderTop: '2px solid #C9A96E', border: `1px solid ${border}` }}>
                      <p style={{ fontSize: '0.82rem', lineHeight: 1.7, color: textMuted, marginBottom: '10px' }}>{dest.description}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                        {dest.tags.map(t => (
                          <span key={t} style={{ fontSize: '0.65rem', padding: '3px 10px', background: isDark ? '#161616' : '#F8F4EF', color: '#C9A96E', letterSpacing: '0.08em' }}>{t}</span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.72rem', color: textMuted }}>{dest.region}</span>
                        <button onClick={e => { e.stopPropagation(); setBooking(dest); }} className="btn-gold" style={{ padding: '8px 18px', fontSize: '0.7rem' }}>
                          Enquire Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* LIST VIEW */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map((dest, i) => (
              <div
                key={dest.id}
                className="card-hover"
                style={{ display: 'flex', gap: '0', background: cardBg, border: `1px solid ${border}`, cursor: 'pointer', overflow: 'hidden' }}
                data-aos="fade-up" data-aos-delay={Math.min(i * 60, 300)}
              >
                <div style={{ width: '200px', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                  <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '140px', objectFit: 'cover', transition: 'transform 0.5s', display: 'block' }} loading="lazy" />
                </div>
                <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <span className="tag" style={{ marginRight: '8px' }}>{dest.category}</span>
                        <span style={{ fontSize: '0.7rem', color: textMuted }}>{dest.region}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ color: '#C9A96E', fontWeight: 700, fontSize: '1rem' }}>{dest.price}</span>
                        <button
                          onClick={e => { e.stopPropagation(); toggle(dest); addToast(isWished(dest.id) ? `${dest.name} removed` : `${dest.name} saved!`, isWished(dest.id) ? 'info' : 'success'); }}
                          style={{ background: 'none', border: 'none', color: isWished(dest.id) ? '#E87070' : textMuted, cursor: 'pointer', fontSize: '0.9rem' }}
                        >
                          <i className={`fa${isWished(dest.id) ? 's' : 'r'} fa-heart`}></i>
                        </button>
                      </div>
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem', fontWeight: 400, color: textPrimary, marginBottom: '6px' }}>{dest.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: textMuted, lineHeight: 1.6 }}>{dest.description}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      <i className="fas fa-star" style={{ color: '#C9A96E', fontSize: '0.7rem' }}></i>
                      <span style={{ fontSize: '0.78rem', color: textPrimary, fontWeight: 600 }}>{dest.rating}</span>
                      <span style={{ fontSize: '0.72rem', color: textMuted }}>({dest.reviews} reviews)</span>
                    </div>
                    <button onClick={() => setBooking(dest)} className="btn-gold" style={{ padding: '7px 18px', fontSize: '0.7rem' }}>Enquire</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <i className="fas fa-compass" style={{ fontSize: '3rem', color: '#C9A96E', display: 'block', marginBottom: '16px' }}></i>
            <p style={{ color: textMuted }}>No destinations match your filters.</p>
          </div>
        )}
      </section>

      {/* CUSTOM TRIP CTA */}
      <section style={{ padding: '80px 2rem', textAlign: 'center', background: isDark ? '#161616' : '#FFFFFF', borderTop: `1px solid ${border}` }}>
        <span className="section-label" data-aos="fade-up">Bespoke</span>
        <h2 className="hero-title" style={{ fontSize: '2.5rem', color: textPrimary, marginTop: '12px', marginBottom: '16px' }} data-aos="fade-up" data-aos-delay="100">
          Don't See Your Dream?
        </h2>
        <p style={{ color: textMuted, fontSize: '0.88rem', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.8 }} data-aos="fade-up" data-aos-delay="200">
          We build fully bespoke itineraries to anywhere in the world. Tell us where you've always dreamed of going.
        </p>
        <button className="btn-gold" data-aos="fade-up" data-aos-delay="300" onClick={() => setBooking({ name: 'Custom Destination', image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80', price: 'Bespoke' })}>
          Plan a Custom Trip
        </button>
      </section>
    </div>
  );
};

export default Destinations;
