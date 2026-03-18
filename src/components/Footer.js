import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import WeatherWidget from './WeatherWidget';

const Footer = () => {
  const { theme } = useTheme();
  const { addToast } = useToast();
  const isDark = theme === 'dark';
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      addToast('Welcome to the WanderLux inner circle ✈️', 'success');
      setEmail('');
    } else {
      addToast('Please enter a valid email address.', 'error');
    }
  };

  return (
    <footer style={{ background: isDark ? '#0A0A0A' : '#1A1A1A', borderTop: '1px solid #1E1E1E' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '72px 2rem 0' }}>

        {/* Weather strip */}
        <div style={{ marginBottom: '60px', paddingBottom: '48px', borderBottom: '1px solid #1E1E1E' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', fontWeight: 700, marginBottom: '12px' }}>
                Plan Your Next Visit
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', fontWeight: 300, color: '#E8E8E8', marginBottom: '12px' }}>
                Check the Weather at Your Dream Destination
              </h3>
              <p style={{ color: '#6B6B6B', fontSize: '0.82rem', lineHeight: 1.8, maxWidth: '480px', marginBottom: '20px' }}>
                Explore indicative weather conditions across our featured destinations, and let our team help you choose the perfect travel season.
              </p>
              <Link to="/planner" className="btn-gold" style={{ display: 'inline-block', fontSize: '0.72rem', padding: '10px 24px' }}>
                Open Trip Planner
              </Link>
            </div>
            <div className="footer-weather">
              <WeatherWidget />
            </div>
          </div>
        </div>

        {/* Main columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px', marginBottom: '48px' }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', color: '#C9A96E', letterSpacing: '0.2em', fontWeight: 300 }}>WANDER</div>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.38em', color: '#4A4A4A', marginTop: '-2px', marginBottom: '16px' }}>LUX · TRAVEL</div>
            <p style={{ color: '#4A4A4A', fontSize: '0.78rem', lineHeight: 1.8, marginBottom: '20px' }}>
              Crafting extraordinary journeys for discerning travelers since 2009.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['instagram', 'facebook-f', 'twitter', 'pinterest-p', 'youtube'].map(icon => (
                <a
                  key={icon}
                  href="#"
                  style={{
                    width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid #2E2E2E', color: '#6B6B6B', fontSize: '0.78rem', textDecoration: 'none',
                    transition: 'all 0.25s',
                  }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.color = '#C9A96E'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = '#2E2E2E'; e.currentTarget.style.color = '#6B6B6B'; }}
                >
                  <i className={`fab fa-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', fontWeight: 700, marginBottom: '20px' }}>Explore</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Destinations', path: '/destinations' },
                { label: 'Packages', path: '/packages' },
                { label: 'Photo Gallery', path: '/gallery' },
                { label: 'Trip Planner', path: '/planner' },
                { label: 'Travel Journal', path: '/blog' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.path} style={{ color: '#6B6B6B', fontSize: '0.82rem', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseOver={e => e.target.style.color = '#C9A96E'}
                    onMouseOut={e => e.target.style.color = '#6B6B6B'}
                  >{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', fontWeight: 700, marginBottom: '20px' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Contact', path: '/contact' },
                { label: 'Sitemap', path: '/sitemap' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.path} style={{ color: '#6B6B6B', fontSize: '0.82rem', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseOver={e => e.target.style.color = '#C9A96E'}
                    onMouseOut={e => e.target.style.color = '#6B6B6B'}
                  >{item.label}</Link>
                </li>
              ))}
              <li>
                <a href="#" style={{ color: '#6B6B6B', fontSize: '0.82rem', textDecoration: 'none' }}
                  onMouseOver={e => e.target.style.color = '#C9A96E'}
                  onMouseOut={e => e.target.style.color = '#6B6B6B'}
                >Privacy Policy</a>
              </li>
              <li>
                <a href="#" style={{ color: '#6B6B6B', fontSize: '0.82rem', textDecoration: 'none' }}
                  onMouseOver={e => e.target.style.color = '#C9A96E'}
                  onMouseOut={e => e.target.style.color = '#6B6B6B'}
                >Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', fontWeight: 700, marginBottom: '20px' }}>Travel Intelligence</h4>
            <p style={{ color: '#6B6B6B', fontSize: '0.78rem', lineHeight: 1.8, marginBottom: '16px' }}>
              Curated destination guides, exclusive offers, and insider tips — direct to your inbox.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                style={{
                  padding: '11px 14px', background: '#161616',
                  border: '1px solid #2E2E2E', color: '#E8E8E8',
                  fontSize: '0.82rem', outline: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#C9A96E'}
                onBlur={e => e.target.style.borderColor = '#2E2E2E'}
              />
              <button onClick={handleSubscribe} className="btn-gold" style={{ padding: '11px', fontSize: '0.72rem' }}>
                Subscribe
              </button>
            </div>
            <p style={{ color: '#3A3A3A', fontSize: '0.65rem', marginTop: '10px', lineHeight: 1.6 }}>
              No spam, ever. Unsubscribe any time.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #161616', padding: '20px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <p style={{ color: '#3A3A3A', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
            © {new Date().getFullYear()} WanderLux Travel Ltd. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: 'cc-visa', title: 'Visa' },
              { icon: 'cc-mastercard', title: 'Mastercard' },
              { icon: 'cc-amex', title: 'Amex' },
              { icon: 'cc-paypal', title: 'PayPal' },
            ].map(card => (
              <i key={card.icon} className={`fab fa-${card.icon}`} title={card.title} style={{ color: '#3A3A3A', fontSize: '1.5rem' }}></i>
            ))}
            <span style={{ color: '#2E2E2E', margin: '0 8px' }}>|</span>
            <span style={{ color: '#3A3A3A', fontSize: '0.68rem', letterSpacing: '0.06em' }}>
              <i className="fas fa-shield-alt" style={{ color: '#C9A96E', marginRight: '4px' }}></i>
              ATOL Protected
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-weather { display: none; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
