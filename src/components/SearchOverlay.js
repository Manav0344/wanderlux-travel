import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { destinations, packages, blogPosts } from '../data';

const allItems = [
  ...destinations.map(d => ({ ...d, _type: 'destination', path: '/destinations' })),
  ...packages.map(p => ({ ...p, _type: 'package', path: '/packages' })),
  ...blogPosts.map(b => ({ ...b, _type: 'article', path: '/blog', name: b.title })),
];

const SearchOverlay = ({ onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const results = query.length >= 2
    ? allItems.filter(item =>
        item.name?.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase()) ||
        item.region?.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  const typeLabel = { destination: 'Destination', package: 'Package', article: 'Article' };
  const typeColor = { destination: '#C9A96E', package: '#7BB0B5', article: '#B59CDA' };

  const surface = isDark ? '#0D0D0D' : '#F8F4EF';
  const cardBg  = isDark ? '#1E1E1E' : '#FFFFFF';
  const border  = isDark ? '#2E2E2E' : '#E8E0D5';
  const textPrimary = isDark ? '#E8E8E8' : '#1A1A1A';
  const textMuted = isDark ? '#9A9A9A' : '#6B6B6B';

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 10001,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          background: surface,
          borderBottom: `1px solid ${border}`,
          padding: '24px',
          animation: 'slideDownSearch 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Input row */}
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: query && results.length > 0 ? '20px' : '0' }}>
            <i className="fas fa-search" style={{ color: '#C9A96E', fontSize: '1.1rem', flexShrink: 0 }}></i>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search destinations, packages, articles..."
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                fontSize: '1.2rem', color: textPrimary,
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{ background: 'none', border: `1px solid ${border}`, color: textMuted, width: '32px', height: '32px', cursor: 'pointer', flexShrink: 0, fontSize: '0.8rem' }}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: textMuted, padding: '4px 8px', cursor: 'pointer', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0 }}
            >
              ESC
            </button>
          </div>

          {/* Results */}
          {query.length >= 2 && (
            <div>
              {results.length === 0 ? (
                <div style={{ padding: '20px 0', color: textMuted, fontSize: '0.9rem', textAlign: 'center' }}>
                  No results for "<strong style={{ color: textPrimary }}>{query}</strong>"
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: textMuted, marginBottom: '4px' }}>
                    {results.length} result{results.length !== 1 ? 's' : ''}
                  </div>
                  {results.map(item => (
                    <Link
                      key={`${item._type}-${item.id}`}
                      to={item.path}
                      onClick={onClose}
                      style={{
                        display: 'flex', gap: '14px', alignItems: 'center',
                        padding: '12px', background: cardBg,
                        border: `1px solid ${border}`,
                        textDecoration: 'none', transition: 'border-color 0.2s',
                      }}
                      onMouseOver={e => e.currentTarget.style.borderColor = '#C9A96E'}
                      onMouseOut={e => e.currentTarget.style.borderColor = border}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '52px', height: '40px', objectFit: 'cover', flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                          <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: typeColor[item._type], fontWeight: 700 }}>
                            {typeLabel[item._type]}
                          </span>
                          {item.region && <span style={{ fontSize: '0.65rem', color: textMuted }}>{item.region}</span>}
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 500, color: textPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.name}
                        </div>
                      </div>
                      {item.price && (
                        <div style={{ fontSize: '0.85rem', color: '#C9A96E', fontWeight: 600, flexShrink: 0 }}>
                          {item.price}
                        </div>
                      )}
                      <i className="fas fa-arrow-right" style={{ color: textMuted, fontSize: '0.7rem', flexShrink: 0 }}></i>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick links when empty */}
          {query.length === 0 && (
            <div style={{ marginTop: '20px' }}>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: textMuted, marginBottom: '12px' }}>
                Popular Searches
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Maldives', 'Italy', 'Japan', 'Adventure', 'Luxury', 'Romantic', 'Islands'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    style={{
                      padding: '7px 14px', border: `1px solid ${border}`,
                      background: 'none', color: textMuted,
                      fontSize: '0.75rem', cursor: 'pointer',
                      transition: 'all 0.2s', letterSpacing: '0.05em',
                    }}
                    onMouseOver={e => { e.target.style.borderColor = '#C9A96E'; e.target.style.color = '#C9A96E'; }}
                    onMouseOut={e => { e.target.style.borderColor = border; e.target.style.color = textMuted; }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideDownSearch {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SearchOverlay;
