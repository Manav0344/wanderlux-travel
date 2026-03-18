import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 149.5 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.53 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.1 },
];

const CurrencyWidget = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [amount, setAmount] = useState('1000');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  const fromRate = currencies.find(c => c.code === from)?.rate || 1;
  const toRate = currencies.find(c => c.code === to)?.rate || 1;
  const result = ((parseFloat(amount) || 0) / fromRate * toRate).toFixed(2);
  const toSymbol = currencies.find(c => c.code === to)?.symbol || '';

  const selectStyle = {
    background: isDark ? '#161616' : '#F8F4EF',
    border: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}`,
    color: isDark ? '#E8E8E8' : '#1A1A1A',
    padding: '8px 12px',
    fontSize: '0.8rem',
    outline: 'none',
    cursor: 'pointer',
    width: '100%',
  };

  return (
    <div
      style={{
        background: isDark ? '#1E1E1E' : '#FFFFFF',
        border: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}`,
        padding: '20px',
        maxWidth: '320px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <i className="fas fa-exchange-alt" style={{ color: '#C9A96E', fontSize: '0.85rem' }}></i>
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, color: '#C9A96E' }}>
          Currency Converter
        </span>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: isDark ? '#9A9A9A' : '#6B6B6B', display: 'block', marginBottom: '6px' }}>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={{ ...selectStyle }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '8px', alignItems: 'end', marginBottom: '16px' }}>
        <div>
          <label style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: isDark ? '#9A9A9A' : '#6B6B6B', display: 'block', marginBottom: '6px' }}>From</label>
          <select value={from} onChange={e => setFrom(e.target.value)} style={selectStyle}>
            {currencies.map(c => <option key={c.code} value={c.code}>{c.code} – {c.symbol}</option>)}
          </select>
        </div>
        <button
          onClick={() => { setFrom(to); setTo(from); }}
          style={{
            background: 'none', border: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}`,
            color: '#C9A96E', width: '34px', height: '34px',
            cursor: 'pointer', fontSize: '0.75rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <i className="fas fa-arrows-alt-h"></i>
        </button>
        <div>
          <label style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: isDark ? '#9A9A9A' : '#6B6B6B', display: 'block', marginBottom: '6px' }}>To</label>
          <select value={to} onChange={e => setTo(e.target.value)} style={selectStyle}>
            {currencies.map(c => <option key={c.code} value={c.code}>{c.code} – {c.symbol}</option>)}
          </select>
        </div>
      </div>

      <div
        style={{
          background: isDark ? '#161616' : '#F8F4EF',
          padding: '14px',
          textAlign: 'center',
          borderTop: '2px solid #C9A96E',
        }}
      >
        <div style={{ fontSize: '0.7rem', color: isDark ? '#9A9A9A' : '#6B6B6B', marginBottom: '4px', letterSpacing: '0.05em' }}>
          {amount || 0} {from} =
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, color: '#C9A96E' }}>
          {toSymbol}{result}
        </div>
        <div style={{ fontSize: '0.65rem', color: isDark ? '#9A9A9A' : '#6B6B6B', marginTop: '4px' }}>
          {to} · Indicative rates
        </div>
      </div>
    </div>
  );
};

export default CurrencyWidget;
