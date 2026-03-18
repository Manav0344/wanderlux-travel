import React, { useEffect, useCallback } from 'react';

const Lightbox = ({ images, startIndex = 0, onClose }) => {
  const [current, setCurrent] = React.useState(startIndex);

  const prev = useCallback(() => setCurrent(c => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(c => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(0,0,0,0.96)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '1.5rem', right: '1.5rem',
          background: 'none', border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff', width: '44px', height: '44px',
          fontSize: '1rem', cursor: 'pointer', borderRadius: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color 0.2s', zIndex: 1,
        }}
      >
        <i className="fas fa-times"></i>
      </button>

      {/* Counter */}
      <div style={{
        position: 'absolute', top: '1.5rem', left: '1.5rem',
        color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '0.15em',
      }}>
        {current + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); prev(); }}
          style={{
            position: 'absolute', left: '1.5rem',
            background: 'none', border: '1px solid rgba(255,255,255,0.15)',
            color: '#C9A96E', width: '48px', height: '48px',
            fontSize: '1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
      )}

      {/* Image */}
      <div
        style={{ maxWidth: '85vw', maxHeight: '80vh', position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        <img
          key={current}
          src={images[current].src}
          alt={images[current].alt || ''}
          style={{
            maxWidth: '85vw', maxHeight: '80vh',
            objectFit: 'contain', display: 'block',
            animation: 'fadeIn 0.3s ease',
            boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
          }}
        />
        {images[current].caption && (
          <div style={{
            position: 'absolute', bottom: '-2.5rem', left: 0, right: 0,
            textAlign: 'center', color: 'rgba(255,255,255,0.5)',
            fontSize: '0.75rem', letterSpacing: '0.1em',
          }}>
            {images[current].caption}
          </div>
        )}
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); next(); }}
          style={{
            position: 'absolute', right: '1.5rem',
            background: 'none', border: '1px solid rgba(255,255,255,0.15)',
            color: '#C9A96E', width: '48px', height: '48px',
            fontSize: '1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div style={{
          position: 'absolute', bottom: '1.5rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: '8px',
        }}
          onClick={e => e.stopPropagation()}
        >
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: '52px', height: '36px',
                overflow: 'hidden', cursor: 'pointer',
                border: `2px solid ${i === current ? '#C9A96E' : 'transparent'}`,
                opacity: i === current ? 1 : 0.4,
                transition: 'all 0.2s',
              }}
            >
              <img src={img.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lightbox;
