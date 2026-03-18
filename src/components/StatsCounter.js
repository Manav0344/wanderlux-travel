import React from 'react';
import { useTheme } from '../context/ThemeContext';
import useCountUp from '../hooks/useCountUp';

const StatItem = ({ target, suffix = '', label, delay = 0 }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { count, ref } = useCountUp(target, 2200);

  return (
    <div
      ref={ref}
      className="text-center"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 300,
          color: '#C9A96E',
          lineHeight: 1,
          letterSpacing: '-0.01em',
        }}
      >
        {count.toLocaleString()}{suffix}
      </div>
      <div
        style={{
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontWeight: 600,
          marginTop: '10px',
          color: isDark ? '#9A9A9A' : '#6B6B6B',
        }}
      >
        {label}
      </div>
    </div>
  );
};

const StatsCounter = ({ stats, dark = true }) => {
  const bg = dark ? '#0A0A0A' : '#1A1A1A';

  return (
    <section style={{ background: bg, padding: '72px 2rem' }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '40px',
        }}
      >
        {stats.map((s, i) => (
          <StatItem key={s.label} {...s} delay={i * 100} />
        ))}
      </div>
    </section>
  );
};

export default StatsCounter;
