import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const NotFound = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: isDark ? '#0D0D0D' : '#F8F4EF' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80')` }}
      />

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Big 404 */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(8rem, 20vw, 16rem)',
            fontWeight: 300,
            color: '#C9A96E',
            lineHeight: 1,
            opacity: 0.15,
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          404
        </div>

        <div className="relative z-10">
          <span
            className="block text-xs tracking-widest uppercase mb-6"
            style={{ color: '#C9A96E', letterSpacing: '0.25em' }}
          >
            Lost in Transit
          </span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 300,
              color: isDark ? '#E8E8E8' : '#1A1A1A',
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}
          >
            This Page Has<br />
            <em style={{ color: '#C9A96E' }}>Gone Exploring</em>
          </h1>
          <p
            style={{
              color: isDark ? '#9A9A9A' : '#6B6B6B',
              fontSize: '0.9rem',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
              maxWidth: '400px',
              margin: '0 auto 2.5rem',
            }}
          >
            The page you're looking for seems to have set off on its own adventure. Let us guide you back to somewhere wonderful.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn-gold">Return Home</Link>
            <Link to="/destinations" className="btn-outline" style={{ color: isDark ? '#E8E8E8' : '#1A1A1A', borderColor: isDark ? '#2E2E2E' : '#E8E0D5' }}>
              Explore Destinations
            </Link>
          </div>

          <div
            style={{
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}`,
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { label: 'Packages', path: '/packages' },
              { label: 'Journal', path: '/blog' },
              { label: 'About', path: '/about' },
              { label: 'Contact', path: '/contact' },
            ].map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: isDark ? '#9A9A9A' : '#6B6B6B',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseOver={e => e.target.style.color = '#C9A96E'}
                onMouseOut={e => e.target.style.color = isDark ? '#9A9A9A' : '#6B6B6B'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
