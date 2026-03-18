import React from 'react';

const PageLoader = () => (
  <div style={{
    position: 'fixed', inset: 0, zIndex: 20000,
    background: '#0D0D0D',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: '24px',
  }}>
    <div style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: '2.5rem',
      fontWeight: 300,
      color: '#C9A96E',
      letterSpacing: '0.25em',
    }}>
      WANDER<span style={{ color: 'rgba(201,169,110,0.4)' }}>LUX</span>
    </div>
    <div style={{
      width: '120px', height: '1px',
      background: '#1E1E1E',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0,
        height: '100%', background: '#C9A96E',
        animation: 'loadBar 1.2s ease-in-out infinite',
      }} />
    </div>
    <style>{`
      @keyframes loadBar {
        0%   { width: 0%; left: 0; }
        50%  { width: 70%; left: 15%; }
        100% { width: 0%; left: 100%; }
      }
    `}</style>
  </div>
);

export default PageLoader;
