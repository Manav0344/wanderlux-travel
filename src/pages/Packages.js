import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import BookingModal from '../components/BookingModal';
import { packages } from '../data';

const Packages = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toggle, isWished } = useWishlist();
  const { addToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeDifficulty, setActiveDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (window.AOS) window.AOS.refresh();
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Romantic', 'Cultural', 'Luxury', 'Adventure'];
  const difficulties = ['All', 'Easy', 'Moderate', 'Challenging'];

  const filtered = packages
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => activeDifficulty === 'All' || p.difficulty === activeDifficulty)
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
      if (sortBy === 'price-desc') return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''));
      return 0;
    });

  const tagColors = {
    Bestseller: '#C9A96E',
    Popular: '#7BB0B5',
    Luxury: '#B59CDA',
    Adventure: '#7BB87B',
    Value: '#E8916A',
    Seasonal: '#DA9CB5',
  };

  return (
    <div style={{ background: isDark ? '#0D0D0D' : '#F8F4EF', color: isDark ? '#E8E8E8' : '#1A1A1A' }}>
      {booking && <BookingModal item={booking} type="package" onClose={() => setBooking(null)} />}
      {/* HERO */}
      <section className="relative flex items-end pb-20 overflow-hidden" style={{ height: '60vh' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80')`, backgroundAttachment: 'fixed' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.75))' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <span className="section-label text-gold" data-aos="fade-up">Curated Journeys</span>
          <h1
            className="hero-title text-white mt-3"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Travel Packages
          </h1>
        </div>
      </section>

      {/* FILTERS */}
      <section
        className="sticky top-20 z-30 py-5 px-6 lg:px-12"
        style={{
          background: isDark ? 'rgba(13,13,13,0.97)' : 'rgba(248,244,239,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}`
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs tracking-widest uppercase self-center mr-2" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>Type:</span>
              {categories.map(c => (
                <button key={c} onClick={() => setActiveCategory(c)} className={`filter-btn ${activeCategory === c ? 'active' : ''}`}>{c}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs tracking-widest uppercase self-center mr-2" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>Difficulty:</span>
              {difficulties.map(d => (
                <button key={d} onClick={() => setActiveDifficulty(d)} className={`filter-btn ${activeDifficulty === d ? 'active' : ''}`}>{d}</button>
              ))}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="filter-btn"
                style={{ background: isDark ? '#0D0D0D' : '#F8F4EF', color: isDark ? '#9A9A9A' : '#6B6B6B', cursor: 'pointer' }}
              >
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low-High</option>
                <option value="price-desc">Price: High-Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES GRID */}
      <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-sm mb-8" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>
          Showing <span className="text-gold">{filtered.length}</span> packages
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((pkg, i) => (
            <div
              key={pkg.id}
              className="rounded-sm overflow-hidden card-hover"
              style={{
                background: isDark ? '#1E1E1E' : '#FFFFFF',
                border: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}`,
                position: 'relative'
              }}
              data-aos="fade-up"
              data-aos-delay={Math.min(i * 100, 400)}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: '240px' }}>
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className="text-xs font-bold px-3 py-1"
                    style={{
                      background: tagColors[pkg.tag] || '#C9A96E',
                      color: '#0D0D0D',
                      letterSpacing: '0.05em',
                      fontSize: '0.65rem',
                      textTransform: 'uppercase'
                    }}
                  >
                    {pkg.tag}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-black bg-opacity-60 px-3 py-1 text-xs text-white">
                  {pkg.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3
                      className="font-display text-xl mb-1"
                      style={{ color: isDark ? '#E8E8E8' : '#1A1A1A', fontWeight: 400 }}
                    >
                      {pkg.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <i className="fas fa-map-marker-alt text-gold text-xs"></i>
                      <span className="text-xs" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>
                        {pkg.destinations.join(' · ')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <i className="fas fa-star star text-xs"></i>
                    <span className="text-xs font-semibold" style={{ color: isDark ? '#E8E8E8' : '#1A1A1A' }}>{pkg.rating}</span>
                    <span className="text-xs" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>({pkg.reviews})</span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>
                  {pkg.description}
                </p>

                {/* Includes */}
                <div className="mb-4">
                  <div className="text-xs font-semibold mb-2 tracking-widest uppercase" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B', fontSize: '0.65rem' }}>
                    Includes
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pkg.includes.map(inc => (
                      <span
                        key={inc}
                        className="text-xs flex items-center gap-1"
                        style={{ color: isDark ? '#B0B0B0' : '#4A4A4A' }}
                      >
                        <i className="fas fa-check text-gold" style={{ fontSize: '0.6rem' }}></i>
                        {inc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}` }}
                >
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-2xl text-gold" style={{ fontWeight: 400 }}>{pkg.price}</span>
                      <span className="text-xs line-through" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>{pkg.originalPrice}</span>
                    </div>
                    <div className="text-xs" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>per person</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-outline text-xs" style={{
                      padding: '8px 14px',
                      color: isDark ? '#E8E8E8' : '#1A1A1A',
                      borderColor: isDark ? '#2E2E2E' : '#E8E0D5'
                    }}>
                      Details
                    </button>
                    <button className="btn-gold text-xs" style={{ padding: '8px 18px' }} onClick={() => setBooking(pkg)}>Book</button>
                  </div>
                </div>

                {/* Wishlist heart */}
                <button
                  onClick={() => { toggle(pkg); addToast(isWished(pkg.id) ? `${pkg.name} removed from wishlist` : `${pkg.name} saved!`, isWished(pkg.id) ? 'info' : 'success'); }}
                  style={{
                    position: 'absolute', top: '12px', right: '12px',
                    width: '34px', height: '34px', borderRadius: '50%',
                    background: 'rgba(0,0,0,0.55)', border: 'none',
                    color: isWished(pkg.id) ? '#E87070' : '#fff',
                    cursor: 'pointer', fontSize: '0.85rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <i className={`fa${isWished(pkg.id) ? 's' : 'r'} fa-heart`}></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOM PACKAGE */}
      <section
        className="py-24 px-6 text-center relative overflow-hidden"
        style={{ background: isDark ? '#0A0A0A' : '#1A1A1A' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="section-label text-gold" data-aos="fade-up">Bespoke</span>
          <h2
            className="hero-title text-white mt-4 mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Build Your Own Package
          </h2>
          <p className="text-gray-400 mb-10 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            Every destination. Any duration. Your exact vision. Our travel designers create completely tailored experiences — from private island escapes to cross-continental adventures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="300">
            <button className="btn-gold">Design Custom Package</button>
            <button className="btn-outline text-white border-gray-600">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
