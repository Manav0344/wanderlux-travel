import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const CookieBanner = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = sessionStorage.getItem('wl-cookies');
    if (!accepted) {
      const t = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    sessionStorage.setItem('wl-cookies', '1');
    setVisible(false);
  };

  const decline = () => {
    sessionStorage.setItem('wl-cookies', '0');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        zIndex: 9990,
        maxWidth: '420px',
        background: isDark ? '#161616' : '#FFFFFF',
        border: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}`,
        padding: '20px 22px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        animation: 'slideUpCookie 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
    >
      <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
        <span style={{ fontSize: '1.4rem' }}>🍪</span>
        <div>
          <div
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: isDark ? '#E8E8E8' : '#1A1A1A',
              marginBottom: '6px',
            }}
          >
            Cookie Preferences
          </div>
          <p
            style={{
              fontSize: '0.76rem',
              lineHeight: 1.7,
              color: isDark ? '#9A9A9A' : '#6B6B6B',
            }}
          >
            We use cookies to personalise your experience and analyse site traffic. By continuing, you accept our{' '}
            <a href="#" style={{ color: '#C9A96E', textDecoration: 'none' }}>Cookie Policy</a>.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          onClick={decline}
          style={{
            background: 'none',
            border: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}`,
            color: isDark ? '#9A9A9A' : '#6B6B6B',
            padding: '8px 16px',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="btn-gold"
          style={{ padding: '8px 20px', fontSize: '0.7rem' }}
        >
          Accept All
        </button>
      </div>
      <style>{`
        @keyframes slideUpCookie {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CookieBanner;
