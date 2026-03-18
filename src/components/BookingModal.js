import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

const BookingModal = ({ item, type = 'destination', onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { addToast } = useToast();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    guests: '2', date: '', duration: '7', notes: ''
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    addToast(`Booking request sent for ${item.name}!`, 'success');
    onClose();
  };

  const surface = isDark ? '#1E1E1E' : '#FFFFFF';
  const border = isDark ? '#2E2E2E' : '#E8E0D5';
  const textPrimary = isDark ? '#E8E8E8' : '#1A1A1A';
  const textMuted = isDark ? '#9A9A9A' : '#6B6B6B';
  const inputBg = isDark ? '#161616' : '#F8F4EF';

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    background: inputBg, border: `1px solid ${border}`,
    color: textPrimary, fontSize: '0.85rem',
    outline: 'none', fontFamily: "'DM Sans', sans-serif",
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block', fontSize: '0.65rem',
    letterSpacing: '0.12em', textTransform: 'uppercase',
    fontWeight: 600, color: textMuted, marginBottom: '6px',
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem', animation: 'fadeIn 0.25s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: surface, width: '100%', maxWidth: '560px',
          maxHeight: '90vh', overflowY: 'auto',
          border: `1px solid ${border}`,
          animation: 'slideUpModal 0.3s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: `1px solid ${border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '4px' }}>
              {type === 'package' ? 'Book Package' : 'Enquire'}
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 400, color: textPrimary }}>
              {item.name}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: `1px solid ${border}`,
              color: textMuted, width: '36px', height: '36px',
              cursor: 'pointer', fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Progress Steps */}
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${border}`, display: 'flex', gap: '8px' }}>
          {['Trip Details', 'Your Info', 'Confirm'].map((s, i) => (
            <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: i + 1 <= step ? '#C9A96E' : border,
                color: i + 1 <= step ? '#0D0D0D' : textMuted,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 700, transition: 'all 0.3s',
              }}>
                {i + 1 < step ? <i className="fas fa-check" style={{ fontSize: '0.65rem' }}></i> : i + 1}
              </div>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: i + 1 <= step ? '#C9A96E' : textMuted }}>
                {s}
              </span>
            </div>
          ))}
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          {/* Item summary */}
          <div style={{
            display: 'flex', gap: '14px', marginBottom: '24px',
            padding: '14px', background: isDark ? '#161616' : '#F8F4EF',
            border: `1px solid ${border}`,
          }}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '72px', height: '54px', objectFit: 'cover', flexShrink: 0 }}
            />
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: textPrimary, marginBottom: '2px' }}>{item.name}</div>
              {item.duration && <div style={{ fontSize: '0.72rem', color: textMuted }}>{item.duration}</div>}
              {item.price && (
                <div style={{ fontSize: '0.9rem', color: '#C9A96E', fontWeight: 600, marginTop: '4px' }}>
                  from {item.price} <span style={{ fontSize: '0.7rem', color: textMuted, fontWeight: 400 }}>per person</span>
                </div>
              )}
            </div>
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Departure Date</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Duration (nights)</label>
                  <select name="duration" value={form.duration} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {[3,5,7,10,14,21].map(n => <option key={n} value={n}>{n} nights</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Number of Guests</label>
                <select name="guests" value={form.guests} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {[1,2,3,4,5,6,'7+'].map(n => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Special Requests</label>
                <textarea
                  name="notes" value={form.notes} onChange={handleChange}
                  rows={3} placeholder="Dietary requirements, accessibility needs, anniversary celebrations..."
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" style={inputStyle} />
              </div>
              <p style={{ fontSize: '0.72rem', color: textMuted, lineHeight: 1.7, padding: '12px', background: isDark ? '#161616' : '#F8F4EF', border: `1px solid ${border}` }}>
                <i className="fas fa-shield-alt" style={{ color: '#C9A96E', marginRight: '6px' }}></i>
                Your information is secure. We never share your details with third parties.
              </p>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: textPrimary, fontWeight: 400, marginBottom: '16px' }}>
                Booking Summary
              </h3>
              {[
                { label: 'Destination', value: item.name },
                { label: 'Date', value: form.date || 'Flexible' },
                { label: 'Duration', value: `${form.duration} nights` },
                { label: 'Guests', value: `${form.guests} guest${form.guests > 1 ? 's' : ''}` },
                { label: 'Contact', value: form.name || '—' },
                { label: 'Email', value: form.email || '—' },
              ].map(row => (
                <div key={row.label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '10px 0', borderBottom: `1px solid ${border}`,
                  fontSize: '0.82rem',
                }}>
                  <span style={{ color: textMuted }}>{row.label}</span>
                  <span style={{ color: textPrimary, fontWeight: 500 }}>{row.value}</span>
                </div>
              ))}
              <p style={{ fontSize: '0.72rem', color: textMuted, marginTop: '16px', lineHeight: 1.7 }}>
                By submitting this enquiry, a WanderLux travel designer will contact you within 24 hours to confirm availability and finalise your booking.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: `1px solid ${border}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          {step > 1 ? (
            <button
              onClick={() => setStep(s => s - 1)}
              style={{
                background: 'none', border: `1px solid ${border}`,
                color: textMuted, padding: '10px 20px',
                fontSize: '0.72rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              ← Back
            </button>
          ) : <span />}
          {step < 3 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              className="btn-gold"
              style={{ padding: '11px 28px' }}
            >
              Continue →
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-gold" style={{ padding: '11px 28px' }}>
              <i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i>
              Send Enquiry
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUpModal {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BookingModal;
