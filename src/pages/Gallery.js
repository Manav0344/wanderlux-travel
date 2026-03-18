import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Lightbox from '../components/Lightbox';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80', caption: 'Santorini, Greece', category: 'Europe', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80', caption: 'Maldives', category: 'Asia', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80', caption: 'Kyoto, Japan', category: 'Asia', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80', caption: 'Amalfi Coast, Italy', category: 'Europe', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1535910038928-e4ea9b52c1fc?w=800&q=80', caption: 'Patagonia, Argentina', category: 'Americas', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1597212720158-014da2d97474?w=800&q=80', caption: 'Marrakech, Morocco', category: 'Africa', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', caption: 'Bali, Indonesia', category: 'Asia', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80', caption: 'Iceland', category: 'Europe', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80', caption: 'Tokyo, Japan', category: 'Asia', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', caption: 'Swiss Alps', category: 'Europe', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80', caption: 'New Zealand', category: 'Pacific', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80', caption: 'Overwater Villa', category: 'Asia', size: 'tall' },
  { src: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80', caption: 'Northern Lights, Iceland', category: 'Europe', size: 'wide' },
  { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80', caption: 'Scottish Highlands', category: 'Europe', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1508009603885-50cf7c8dd0d5?w=800&q=80', caption: 'Southeast Asia', category: 'Asia', size: 'normal' },
  { src: 'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800&q=80', caption: 'Turquoise Waters', category: 'Pacific', size: 'wide' },
];

const Gallery = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (window.AOS) window.AOS.refresh();
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Europe', 'Asia', 'Americas', 'Africa', 'Pacific'];

  const filtered = galleryImages.filter(img => activeCategory === 'All' || img.category === activeCategory);

  return (
    <div style={{ background: isDark ? '#0D0D0D' : '#F8F4EF', color: isDark ? '#E8E8E8' : '#1A1A1A' }}>
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* HERO */}
      <section className="relative flex items-end pb-20 overflow-hidden" style={{ height: '60vh' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80')`,
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.75))' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <span className="section-label text-gold" data-aos="fade-up">Visual Journey</span>
          <h1
            className="hero-title text-white mt-3"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Photo Gallery
          </h1>
        </div>
      </section>

      {/* FILTERS */}
      <div
        className="sticky top-20 z-30 py-5 px-6 lg:px-12"
        style={{
          background: isDark ? 'rgba(13,13,13,0.97)' : 'rgba(248,244,239,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}`
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 items-center">
          <span className="text-xs tracking-widest uppercase mr-2" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>Region:</span>
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} className={`filter-btn ${activeCategory === c ? 'active' : ''}`}>{c}</button>
          ))}
          <span className="ml-auto text-xs" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>
            {filtered.length} photos · click to enlarge
          </span>
        </div>
      </div>

      {/* MASONRY-STYLE GRID */}
      <section className="py-12 px-6 lg:px-12 max-w-7xl mx-auto">
        <div
          style={{
            columns: 'var(--cols, 3)',
            columnGap: '16px',
            '--cols': '3',
          }}
          className="gallery-grid"
        >
          <style>{`
            @media (max-width: 768px) { .gallery-grid { columns: 2 !important; } }
            @media (max-width: 480px) { .gallery-grid { columns: 1 !important; } }
          `}</style>
          {filtered.map((img, i) => (
            <div
              key={i}
              onClick={() => setLightboxIndex(i)}
              data-aos="fade-up"
              data-aos-delay={Math.min(i * 60, 350)}
              style={{
                breakInside: 'avoid',
                marginBottom: '16px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                display: 'block',
              }}
              className="gallery-item group"
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                style={{
                  width: '100%',
                  display: 'block',
                  transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
                }}
                className="gallery-img"
              />
              {/* Overlay */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '16px',
                }}
                className="gallery-overlay"
              >
                <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 500 }}>{img.caption}</div>
                <div style={{ color: '#C9A96E', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '4px' }}>
                  {img.category}
                </div>
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  width: '32px', height: '32px',
                  background: 'rgba(201,169,110,0.9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#0D0D0D', fontSize: '0.75rem',
                }}>
                  <i className="fas fa-expand"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          .gallery-item:hover .gallery-img { transform: scale(1.04); }
          .gallery-item:hover .gallery-overlay { opacity: 1; }
        `}</style>
      </section>

      {/* INSTAGRAM CTA */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: isDark ? '#161616' : '#FFFFFF', borderTop: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}` }}
      >
        <span className="section-label" data-aos="fade-up">Follow Our Journey</span>
        <h2
          className="hero-title mt-4 mb-4"
          style={{ fontSize: '2.5rem', color: isDark ? '#E8E8E8' : '#1A1A1A' }}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          @wanderlux on Instagram
        </h2>
        <p
          className="text-sm mb-8 max-w-md mx-auto"
          style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Daily inspiration from the world's most extraordinary destinations.
        </p>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold inline-flex items-center gap-2"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <i className="fab fa-instagram"></i>
          Follow on Instagram
        </a>
      </section>
    </div>
  );
};

export default Gallery;
