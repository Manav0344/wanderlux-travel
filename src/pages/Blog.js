import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { blogPosts } from '../data';

const Blog = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { addToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (window.AOS) window.AOS.refresh();
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Travel Tips', 'Destinations', 'Food & Drink', 'Sustainability'];

  const filtered = blogPosts
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));

  const featured = blogPosts.filter(p => p.featured)[0];

  return (
    <div style={{ background: isDark ? '#0D0D0D' : '#F8F4EF', color: isDark ? '#E8E8E8' : '#1A1A1A' }}>
      {/* HERO */}
      <section className="relative flex items-end pb-20 overflow-hidden" style={{ height: '60vh' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80')`, backgroundAttachment: 'fixed' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.75))' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <span className="section-label text-gold" data-aos="fade-up">Stories & Inspiration</span>
          <h1
            className="hero-title text-white mt-3"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            data-aos="fade-up"
            data-aos-delay="150"
          >
            The WanderLux Journal
          </h1>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <span className="section-label block mb-6" data-aos="fade-up">Editor's Pick</span>
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-sm overflow-hidden"
          style={{ border: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}` }}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="relative overflow-hidden" style={{ minHeight: '400px' }}>
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover absolute inset-0 hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div
            className="p-10 flex flex-col justify-center"
            style={{ background: isDark ? '#1E1E1E' : '#FFFFFF' }}
          >
            <div className="flex gap-3 mb-4">
              <span className="tag">{featured.category}</span>
              <span className="text-xs" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>{featured.readTime}</span>
            </div>
            <h2
              className="font-display text-3xl mb-4 leading-tight"
              style={{ color: isDark ? '#E8E8E8' : '#1A1A1A', fontWeight: 400 }}
            >
              {featured.title}
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-3 mb-8">
              <img src={featured.authorImage} alt={featured.author} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="text-sm font-semibold" style={{ color: isDark ? '#E8E8E8' : '#1A1A1A' }}>{featured.author}</div>
                <div className="text-xs" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>{featured.date}</div>
              </div>
            </div>
            <button className="btn-gold self-start">Read Article</button>
          </div>
        </div>
      </section>

      {/* FILTERS + SEARCH */}
      <div
        className="sticky top-20 z-30 py-5 px-6 lg:px-12"
        style={{
          background: isDark ? 'rgba(13,13,13,0.97)' : 'rgba(248,244,239,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}`
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)} className={`filter-btn ${activeCategory === c ? 'active' : ''}`}>{c}</button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ width: '240px', fontSize: '0.8rem', padding: '10px 36px 10px 16px' }}
            />
            <i
              className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-xs"
              style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}
            ></i>
          </div>
        </div>
      </div>

      {/* GRID */}
      <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post, i) => (
            <article
              key={post.id}
              className="rounded-sm overflow-hidden card-hover cursor-pointer group"
              style={{
                background: isDark ? '#1E1E1E' : '#FFFFFF',
                border: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}`
              }}
              data-aos="fade-up"
              data-aos-delay={Math.min(i * 100, 400)}
            >
              <div className="relative overflow-hidden" style={{ height: '220px' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="tag">{post.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <img src={post.authorImage} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
                  <div>
                    <span className="text-xs font-semibold" style={{ color: isDark ? '#E8E8E8' : '#1A1A1A' }}>{post.author}</span>
                    <span className="text-xs mx-2" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>·</span>
                    <span className="text-xs" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>{post.readTime}</span>
                  </div>
                </div>
                <h3
                  className="font-display text-lg mb-3 leading-tight group-hover:text-gold transition-colors"
                  style={{ color: isDark ? '#E8E8E8' : '#1A1A1A', fontWeight: 400 }}
                >
                  {post.title}
                </h3>
                <p
                  className="text-xs leading-relaxed mb-4 line-clamp-3"
                  style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}
                >
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>{post.date}</span>
                  <span className="text-gold text-xs font-semibold flex items-center gap-1">
                    Read more <i className="fas fa-arrow-right text-xs"></i>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <i className="fas fa-newspaper text-4xl text-gold mb-4"></i>
            <p style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>No articles match your search.</p>
          </div>
        )}
      </section>

      {/* NEWSLETTER */}
      <section
        className="py-24 px-6 text-center"
        style={{ background: isDark ? '#161616' : '#FFFFFF', borderTop: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}` }}
      >
        <span className="section-label" data-aos="fade-up">Stay Inspired</span>
        <h2
          className="hero-title mt-4 mb-4"
          style={{ fontSize: '2.5rem', color: isDark ? '#E8E8E8' : '#1A1A1A' }}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Travel Intelligence, Delivered
        </h2>
        <p
          className="text-sm mb-8 max-w-md mx-auto"
          style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Curated destination guides, exclusive offers, and inspiration from our editors — straight to your inbox.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <input
            type="email"
            placeholder="Your email address"
            className="form-input flex-1"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button
            className="btn-gold whitespace-nowrap"
            onClick={() => {
              if (email) {
                addToast('Subscribed! Welcome to the WanderLux Journal.', 'success');
                setEmail('');
              } else {
                addToast('Please enter a valid email address.', 'error');
              }
            }}
          >Subscribe</button>
        </div>
      </section>
    </div>
  );
};

export default Blog;
