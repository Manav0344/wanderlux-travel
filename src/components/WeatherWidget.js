import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const mockWeather = {
  'Santorini':  { temp: 24, condition: 'Sunny',        icon: 'sun',           humidity: 52, wind: 14, high: 27, low: 19, forecast: [{ day:'Mon',icon:'sun',h:27,l:19 },{ day:'Tue',icon:'cloud-sun',h:25,l:18 },{ day:'Wed',icon:'cloud-sun',h:24,l:17 },{ day:'Thu',icon:'sun',h:28,l:20 },{ day:'Fri',icon:'sun',h:29,l:21 }] },
  'Kyoto':      { temp: 18, condition: 'Partly Cloudy', icon: 'cloud-sun',     humidity: 68, wind: 9,  high: 21, low: 13, forecast: [{ day:'Mon',icon:'cloud-sun',h:21,l:13 },{ day:'Tue',icon:'cloud',h:19,l:12 },{ day:'Wed',icon:'cloud-rain',h:17,l:11 },{ day:'Thu',icon:'cloud-sun',h:20,l:13 },{ day:'Fri',icon:'sun',h:22,l:14 }] },
  'Maldives':   { temp: 30, condition: 'Sunny',        icon: 'sun',           humidity: 75, wind: 18, high: 31, low: 27, forecast: [{ day:'Mon',icon:'sun',h:31,l:27 },{ day:'Tue',icon:'sun',h:30,l:27 },{ day:'Wed',icon:'cloud-sun',h:29,l:26 },{ day:'Thu',icon:'sun',h:31,l:27 },{ day:'Fri',icon:'cloud-sun',h:30,l:26 }] },
  'Patagonia':  { temp: 8,  condition: 'Windy',        icon: 'wind',          humidity: 70, wind: 45, high: 11, low: 3,  forecast: [{ day:'Mon',icon:'wind',h:11,l:3 },{ day:'Tue',icon:'cloud-rain',h:9,l:2 },{ day:'Wed',icon:'wind',h:8,l:1 },{ day:'Thu',icon:'cloud-sun',h:12,l:4 },{ day:'Fri',icon:'cloud',h:10,l:3 }] },
  'Marrakech':  { temp: 28, condition: 'Sunny',        icon: 'sun',           humidity: 35, wind: 12, high: 33, low: 22, forecast: [{ day:'Mon',icon:'sun',h:33,l:22 },{ day:'Tue',icon:'sun',h:34,l:23 },{ day:'Wed',icon:'sun',h:32,l:21 },{ day:'Thu',icon:'cloud-sun',h:30,l:20 },{ day:'Fri',icon:'sun',h:31,l:21 }] },
  'Amalfi':     { temp: 22, condition: 'Sunny',        icon: 'sun',           humidity: 58, wind: 11, high: 25, low: 17, forecast: [{ day:'Mon',icon:'sun',h:25,l:17 },{ day:'Tue',icon:'sun',h:26,l:18 },{ day:'Wed',icon:'cloud-sun',h:23,l:16 },{ day:'Thu',icon:'sun',h:25,l:17 },{ day:'Fri',icon:'sun',h:27,l:19 }] },
  'Bali':       { temp: 27, condition: 'Partly Cloudy', icon: 'cloud-sun',     humidity: 80, wind: 15, high: 29, low: 24, forecast: [{ day:'Mon',icon:'cloud-sun',h:29,l:24 },{ day:'Tue',icon:'cloud-rain',h:27,l:23 },{ day:'Wed',icon:'cloud-rain',h:26,l:22 },{ day:'Thu',icon:'cloud-sun',h:28,l:23 },{ day:'Fri',icon:'sun',h:30,l:25 }] },
  'Iceland':    { temp: 4,  condition: 'Cloudy',       icon: 'cloud',         humidity: 82, wind: 30, high: 6,  low: 0,  forecast: [{ day:'Mon',icon:'cloud',h:6,l:0 },{ day:'Tue',icon:'cloud-rain',h:5,l:1 },{ day:'Wed',icon:'cloud-snow',h:3,l:-1 },{ day:'Thu',icon:'cloud',h:5,l:0 },{ day:'Fri',icon:'cloud-sun',h:7,l:1 }] },
};

const DEST_KEYS = Object.keys(mockWeather);

const iconClass = (icon) => {
  const map = { 'sun':'sun','cloud-sun':'cloud-sun','cloud':'cloud','cloud-rain':'cloud-rain','cloud-snow':'snowflake','wind':'wind' };
  return `fas fa-${map[icon] || 'sun'}`;
};

const WeatherWidget = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [dest, setDest] = useState('Santorini');
  const w = mockWeather[dest];

  const bg     = isDark ? '#1E1E1E' : '#FFFFFF';
  const border = isDark ? '#2E2E2E' : '#E8E0D5';
  const textP  = isDark ? '#E8E8E8' : '#1A1A1A';
  const textM  = isDark ? '#9A9A9A' : '#6B6B6B';

  return (
    <div style={{ background: bg, border: `1px solid ${border}`, padding: '20px', maxWidth: '340px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fas fa-cloud-sun" style={{ color: '#C9A96E', fontSize: '0.85rem' }}></i>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A96E', fontWeight: 700 }}>
            Destination Weather
          </span>
        </div>
        <select
          value={dest}
          onChange={e => setDest(e.target.value)}
          style={{
            background: isDark ? '#161616' : '#F8F4EF',
            border: `1px solid ${border}`,
            color: textP, fontSize: '0.72rem', padding: '5px 8px',
            cursor: 'pointer', outline: 'none',
          }}
        >
          {DEST_KEYS.map(k => <option key={k} value={k}>{k}</option>)}
        </select>
      </div>

      {/* Current */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', padding: '16px', background: isDark ? '#161616' : '#F8F4EF', border: `1px solid ${border}` }}>
        <i className={iconClass(w.icon)} style={{ fontSize: '2.8rem', color: '#C9A96E' }}></i>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '3rem', fontWeight: 300, color: textP, lineHeight: 1 }}>
            {w.temp}°<span style={{ fontSize: '1.5rem' }}>C</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: textM, marginTop: '4px' }}>{w.condition}</div>
          <div style={{ fontSize: '0.68rem', color: textM, marginTop: '2px' }}>↑{w.high}° ↓{w.low}°</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
        {[
          { icon: 'tint', label: 'Humidity', value: `${w.humidity}%` },
          { icon: 'wind', label: 'Wind', value: `${w.wind} km/h` },
        ].map(s => (
          <div key={s.label} style={{ padding: '10px', background: isDark ? '#161616' : '#F8F4EF', border: `1px solid ${border}`, textAlign: 'center' }}>
            <i className={`fas fa-${s.icon}`} style={{ color: '#C9A96E', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}></i>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: textP }}>{s.value}</div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: textM }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* 5-day forecast */}
      <div>
        <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: textM, marginBottom: '8px' }}>5-Day Forecast</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {w.forecast.map(f => (
            <div key={f.day} style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '0.6rem', color: textM, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.day}</div>
              <i className={iconClass(f.icon)} style={{ color: '#C9A96E', fontSize: '0.85rem', display: 'block', margin: '4px 0' }}></i>
              <div style={{ fontSize: '0.65rem', color: textP, fontWeight: 600 }}>{f.h}°</div>
              <div style={{ fontSize: '0.6rem', color: textM }}>{f.l}°</div>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: '0.6rem', color: textM, marginTop: '12px', opacity: 0.6, textAlign: 'right' }}>
        * Indicative forecast only
      </p>
    </div>
  );
};

export default WeatherWidget;
