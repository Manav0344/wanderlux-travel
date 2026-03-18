import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const siteStructure = [
  {
    section: 'Main Pages',
    icon: 'home',
    links: [
      { label: 'Home', path: '/', desc: 'Welcome, hero, featured destinations & testimonials' },
      { label: 'About Us', path: '/about', desc: 'Our story, team, mission & awards' },
      { label: 'Contact', path: '/contact', desc: 'Enquiry form, map, FAQ & social links' },
    ],
  },
  {
    section: 'Explore',
    icon: 'compass',
    links: [
      { label: 'Destinations', path: '/destinations', desc: 'Browse & filter 8 global destinations' },
      { label: 'Packages', path: '/packages', desc: 'Curated travel packages with pricing' },
      { label: 'Gallery', path: '/gallery', desc: 'Photo gallery with lightbox viewer' },
    ],
  },
  {
    section: 'Plan & Read',
    icon: 'map',
    links: [
      { label: 'Trip Planner', path: '/planner', desc: 'Interactive day-by-day itinerary builder' },
      { label: 'Journal / Blog', path: '/blog', desc: 'Travel articles, tips & destination guides' },
    ],
  },
  {
    section: 'Utility',
    icon: 'cog',
    links: [
      { label: 'Sitemap', path: '/sitemap', desc: 'You are here' },
      { label: '404 Not Found', path: '/404-demo', desc: 'Custom error page' },
    ],
  },
];

const Sitemap = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (window.AOS) window.AOS.refresh();
    window.scrollTo(0, 0);
  }, []);

  const surface = isDark ? '#1E1E1E' : '#FFFFFF';
  const border  = isDark ? '#2E2E2E' : '#E8E0D5';
  const textPrimary = isDark ? '#E8E8E8' : '#1A1A1A';
  const textMuted = isDark ? '#9A9A9A' : '#6B6B6B';

  return (
    <div style={{ background: isDark ? '#0D0D0D' : '#F8F4EF', minHeight: '100vh', paddingTop: '100px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 2rem 80px' }}>
        <span className="section-label" data-aos="fade-up">Navigation</span>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.5rem,4vw,3.5rem)', fontWeight: 300, color: textPrimary, margin: '12px 0 8px' }} data-aos="fade-up" data-aos-delay="100">
          Site Map
        </h1>
        <p style={{ color: textMuted, fontSize: '0.88rem', marginBottom: '48px', lineHeight: 1.7 }} data-aos="fade-up" data-aos-delay="200">
          A complete overview of everything available on the WanderLux website.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {siteStructure.map((section, si) => (
            <div
              key={section.section}
              style={{ background: surface, border: `1px solid ${border}`, padding: '24px' }}
              data-aos="fade-up"
              data-aos-delay={si * 80}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', paddingBottom: '16px', borderBottom: `1px solid ${border}` }}>
                <div style={{ width: '34px', height: '34px', background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A96E' }}>
                  <i className={`fas fa-${section.icon} text-sm`}></i>
                </div>
                <h2 style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A96E', fontWeight: 700, margin: 0 }}>
                  {section.section}
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {section.links.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px', borderRadius: '2px', transition: 'background 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.background = isDark ? '#161616' : '#F8F4EF'}
                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <i className="fas fa-arrow-right" style={{ color: '#C9A96E', fontSize: '0.65rem', marginTop: '5px', flexShrink: 0 }}></i>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: textPrimary, marginBottom: '2px' }}>{link.label}</div>
                      <div style={{ fontSize: '0.75rem', color: textMuted, lineHeight: 1.5 }}>{link.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Feature grid */}
        <div style={{ marginTop: '48px' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', fontWeight: 400, color: textPrimary, marginBottom: '24px' }}>
            Key Features
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {[
              { icon: 'adjust', label: 'Dark / Light Theme' },
              { icon: 'search', label: 'Global Search (⌘K)' },
              { icon: 'heart', label: 'Wishlist & Save' },
              { icon: 'calendar-check', label: '3-Step Booking Modal' },
              { icon: 'expand', label: 'Photo Lightbox' },
              { icon: 'exchange-alt', label: 'Currency Converter' },
              { icon: 'cloud-sun', label: 'Weather Widget' },
              { icon: 'map', label: 'Trip Planner' },
              { icon: 'sliders-h', label: 'Filter & Sort' },
              { icon: 'th', label: 'Grid / List View' },
              { icon: 'scroll', label: 'AOS Animations' },
              { icon: 'mobile-alt', label: 'Fully Responsive' },
            ].map(f => (
              <div
                key={f.label}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: surface, border: `1px solid ${border}` }}
              >
                <i className={`fas fa-${f.icon}`} style={{ color: '#C9A96E', fontSize: '0.85rem', flexShrink: 0, width: '16px' }}></i>
                <span style={{ fontSize: '0.78rem', color: textPrimary }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
