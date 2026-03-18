import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import SearchOverlay from './SearchOverlay';
import WishlistDrawer from './WishlistDrawer';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { count: wishlistCount } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setWishlistOpen(false);
  }, [location]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/packages', label: 'Packages' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/planner', label: 'Planner' },
    { path: '/blog', label: 'Journal' },
    { path: '/contact', label: 'Contact' },
  ];

  const isDark = theme === 'dark';

  const iconBtnStyle = {
    width: '38px', height: '38px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}`,
    background: isDark ? '#1E1E1E' : '#FFFFFF',
    color: '#C9A96E', cursor: 'pointer',
    transition: 'all 0.25s', fontSize: '0.82rem',
    position: 'relative',
  };

  return (
    <>
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      {wishlistOpen && <WishlistDrawer onClose={() => setWishlistOpen(false)} />}

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.5s ease',
        background: scrolled ? (isDark ? 'rgba(13,13,13,0.95)' : 'rgba(248,244,239,0.95)') : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}` : '1px solid transparent',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', letterSpacing: '0.25em', color: '#C9A96E', fontWeight: 300 }}>
                WANDER
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.55rem', letterSpacing: '0.4em', color: isDark ? '#9A9A9A' : '#6B6B6B', marginTop: '-2px' }}>
                LUX · TRAVEL
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="wl-desktop-nav" style={{ display: 'none', gap: '28px' }}>
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="nav-link"
                  style={{
                    textDecoration: 'none',
                    color: location.pathname === link.path ? '#C9A96E' : isDark ? '#D0D0D0' : '#4A4A4A',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button onClick={() => setSearchOpen(true)} style={iconBtnStyle} title="Search (Ctrl+K)" aria-label="Open search">
                <i className="fas fa-search"></i>
              </button>

              <button
                onClick={() => setWishlistOpen(true)}
                style={{ ...iconBtnStyle, color: wishlistCount > 0 ? '#E87070' : '#C9A96E' }}
                aria-label="Open wishlist"
              >
                <i className={`fa${wishlistCount > 0 ? 's' : 'r'} fa-heart`}></i>
                {wishlistCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: '#E87070', color: '#fff',
                    fontSize: '0.6rem', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `2px solid ${isDark ? '#0D0D0D' : '#F8F4EF'}`,
                  }}>
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button onClick={toggleTheme} style={iconBtnStyle} aria-label="Toggle theme">
                <i className={`fas fa-${isDark ? 'sun' : 'moon'}`}></i>
              </button>

              <Link to="/contact" className="btn-gold wl-desktop-cta" style={{ padding: '9px 20px', fontSize: '0.7rem', marginLeft: '4px', display: 'none' }}>
                Plan Trip
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="wl-hamburger"
                style={{ ...iconBtnStyle, flexDirection: 'column', gap: '5px', padding: '10px' }}
                aria-label="Toggle menu"
              >
                <span style={{ display: 'block', width: '18px', height: '1.5px', background: isDark ? '#E8E8E8' : '#1A1A1A', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(2.5px, 4px)' : 'none' }} />
                <span style={{ display: 'block', height: '1.5px', background: isDark ? '#E8E8E8' : '#1A1A1A', transition: 'all 0.3s', width: menuOpen ? 0 : '18px', opacity: menuOpen ? 0 : 1 }} />
                <span style={{ display: 'block', width: '18px', height: '1.5px', background: isDark ? '#E8E8E8' : '#1A1A1A', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(2.5px, -4px)' : 'none' }} />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div style={{ borderTop: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}`, paddingBottom: '20px', paddingTop: '8px', animation: 'slideDown 0.3s ease' }}>
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    display: 'block', padding: '11px 0', textDecoration: 'none',
                    color: location.pathname === link.path ? '#C9A96E' : isDark ? '#D0D0D0' : '#4A4A4A',
                    fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                    borderBottom: `1px solid ${isDark ? '#1A1A1A' : '#F0EBE3'}`,
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/contact" className="btn-gold" style={{ display: 'inline-block', marginTop: '14px', padding: '10px 24px' }}>
                Plan Trip
              </Link>
            </div>
          )}
        </div>
      </header>

      <style>{`
        @media (min-width: 1024px) {
          .wl-desktop-nav { display: flex !important; }
          .wl-desktop-cta { display: block !important; }
          .wl-hamburger   { display: none !important; }
        }
        @keyframes slideDown {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
      `}</style>
    </>
  );
};

export default Header;
