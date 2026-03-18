import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

const WishlistDrawer = ({ onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { wishlist, toggle, clear } = useWishlist();
  const { addToast } = useToast();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const surface = isDark ? '#161616' : '#FFFFFF';
  const border  = isDark ? '#2E2E2E' : '#E8E0D5';
  const textPrimary = isDark ? '#E8E8E8' : '#1A1A1A';
  const textMuted = isDark ? '#9A9A9A' : '#6B6B6B';
  const cardBg = isDark ? '#1E1E1E' : '#F8F4EF';

  return (
    <>
      {/* Backdrop */}
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 9999,
          width: '100%', maxWidth: '400px',
          background: surface,
          borderLeft: `1px solid ${border}`,
          display: 'flex', flexDirection: 'column',
          animation: 'slideInDrawer 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '2px' }}>My Wishlist</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: textPrimary, fontWeight: 400 }}>
              {wishlist.length} {wishlist.length === 1 ? 'Place' : 'Places'} Saved
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: `1px solid ${border}`, color: textMuted, width: '36px', height: '36px', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '60px' }}>
              <i className="fas fa-heart" style={{ fontSize: '2.5rem', color: border, display: 'block', marginBottom: '16px' }}></i>
              <p style={{ color: textMuted, fontSize: '0.9rem', marginBottom: '20px' }}>
                No saved places yet. Explore destinations and tap the heart icon to save your favourites.
              </p>
              <Link to="/destinations" onClick={onClose} className="btn-gold" style={{ display: 'inline-block' }}>
                Explore Destinations
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {wishlist.map(item => (
                <div
                  key={item.id}
                  style={{ display: 'flex', gap: '12px', padding: '12px', background: cardBg, border: `1px solid ${border}` }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '72px', height: '56px', objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: textPrimary, marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: textMuted, marginBottom: '6px' }}>
                      {item.region || item.category || item.duration || ''}
                    </div>
                    {item.price && <div style={{ fontSize: '0.85rem', color: '#C9A96E', fontWeight: 600 }}>from {item.price}</div>}
                  </div>
                  <button
                    onClick={() => {
                      toggle(item);
                      addToast(`${item.name} removed from wishlist`, 'info');
                    }}
                    style={{ background: 'none', border: 'none', color: '#E87070', cursor: 'pointer', fontSize: '0.85rem', flexShrink: 0, padding: '4px' }}
                    title="Remove"
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div style={{ padding: '16px 24px', borderTop: `1px solid ${border}`, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link
              to="/contact"
              onClick={onClose}
              className="btn-gold"
              style={{ display: 'block', textAlign: 'center', padding: '13px' }}
            >
              <i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i>
              Plan These Trips
            </Link>
            <button
              onClick={() => { clear(); addToast('Wishlist cleared', 'info'); }}
              style={{ background: 'none', border: `1px solid ${border}`, color: textMuted, padding: '10px', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInDrawer {
          from { opacity: 0; transform: translateX(100%); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </>
  );
};

export default WishlistDrawer;
