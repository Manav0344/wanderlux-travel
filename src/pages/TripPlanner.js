import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { destinations } from '../data';

const ACTIVITIES = [
  { id: 'a1', label: 'City Tour', icon: 'map-marked-alt', duration: 3, category: 'Sightseeing' },
  { id: 'a2', label: 'Beach Day', icon: 'umbrella-beach', duration: 6, category: 'Leisure' },
  { id: 'a3', label: 'Hiking', icon: 'hiking', duration: 5, category: 'Adventure' },
  { id: 'a4', label: 'Museum Visit', icon: 'landmark', duration: 2, category: 'Culture' },
  { id: 'a5', label: 'Local Food Tour', icon: 'utensils', duration: 3, category: 'Food' },
  { id: 'a6', label: 'Sunset Cruise', icon: 'ship', duration: 2, category: 'Leisure' },
  { id: 'a7', label: 'Cooking Class', icon: 'cookie', duration: 3, category: 'Food' },
  { id: 'a8', label: 'Scuba Diving', icon: 'water', duration: 4, category: 'Adventure' },
  { id: 'a9', label: 'Spa & Wellness', icon: 'spa', duration: 3, category: 'Wellness' },
  { id: 'a10', label: 'Temple Visit', icon: 'place-of-worship', duration: 2, category: 'Culture' },
  { id: 'a11', label: 'Night Market', icon: 'store', duration: 2, category: 'Food' },
  { id: 'a12', label: 'Photography Walk', icon: 'camera', duration: 2, category: 'Sightseeing' },
];

const catColors = {
  Sightseeing: '#C9A96E',
  Leisure:     '#7BB0B5',
  Adventure:   '#7BB87B',
  Culture:     '#B59CDA',
  Food:        '#E8916A',
  Wellness:    '#DA9CB5',
};

const TripPlanner = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { addToast } = useToast();

  const [step, setStep] = useState(1); // 1: setup, 2: build, 3: summary
  const [tripConfig, setTripConfig] = useState({
    destination: '',
    startDate: '',
    days: 5,
    travelers: 2,
    style: '',
    budget: '',
  });
  const [days, setDays] = useState([]);
  const [draggedActivity, setDraggedActivity] = useState(null);
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    if (window.AOS) window.AOS.refresh();
    window.scrollTo(0, 0);
  }, []);

  // Build day slots when step 2 is reached
  useEffect(() => {
    if (step === 2 && days.length === 0) {
      setDays(Array.from({ length: tripConfig.days }, (_, i) => ({
        dayNum: i + 1,
        label: tripConfig.startDate
          ? new Date(new Date(tripConfig.startDate).getTime() + i * 86400000)
              .toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
          : `Day ${i + 1}`,
        activities: [],
        notes: '',
      })));
    }
  }, [step, tripConfig.days, tripConfig.startDate, days.length]);

  const addActivity = (activity, dayIdx) => {
    setDays(prev => prev.map((d, i) =>
      i === dayIdx
        ? { ...d, activities: [...d.activities, { ...activity, uid: Date.now() + Math.random() }] }
        : d
    ));
  };

  const removeActivity = (dayIdx, uid) => {
    setDays(prev => prev.map((d, i) =>
      i === dayIdx ? { ...d, activities: d.activities.filter(a => a.uid !== uid) } : d
    ));
  };

  const updateNote = (dayIdx, note) => {
    setDays(prev => prev.map((d, i) => i === dayIdx ? { ...d, notes: note } : d));
  };

  const totalHours = days.reduce((sum, d) => sum + d.activities.reduce((s, a) => s + a.duration, 0), 0);
  const totalActivities = days.reduce((sum, d) => sum + d.activities.length, 0);

  const surface = isDark ? '#1E1E1E' : '#FFFFFF';
  const bg      = isDark ? '#0D0D0D' : '#F8F4EF';
  const border  = isDark ? '#2E2E2E' : '#E8E0D5';
  const cardBg  = isDark ? '#161616' : '#F8F4EF';
  const textPrimary = isDark ? '#E8E8E8' : '#1A1A1A';
  const textMuted   = isDark ? '#9A9A9A' : '#6B6B6B';
  const inputStyle  = { width: '100%', padding: '11px 14px', background: cardBg, border: `1px solid ${border}`, color: textPrimary, fontSize: '0.85rem', outline: 'none', fontFamily: "'DM Sans',sans-serif" };
  const labelStyle  = { display: 'block', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: textMuted, marginBottom: '6px' };

  return (
    <div style={{ background: bg, color: textPrimary, minHeight: '100vh' }}>
      {/* HERO */}
      <section style={{ position: 'relative', height: '55vh', display: 'flex', alignItems: 'flex-end', paddingBottom: '72px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.75))' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
          <span className="section-label text-gold" data-aos="fade-up">Interactive</span>
          <h1 className="hero-title" style={{ color: '#fff', fontSize: 'clamp(2.5rem,5vw,4.5rem)', marginTop: '12px' }} data-aos="fade-up" data-aos-delay="150">
            Trip Planner
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginTop: '10px', maxWidth: '480px' }} data-aos="fade-up" data-aos-delay="250">
            Build your perfect itinerary day by day. Add activities, set your pace, and share with our travel designers.
          </p>
        </div>
      </section>

      {/* PROGRESS BAR */}
      <div style={{ background: isDark ? '#0A0A0A' : '#1A1A1A', padding: '0 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex' }}>
          {['Trip Setup', 'Build Itinerary', 'Summary'].map((s, i) => (
            <button
              key={s}
              onClick={() => { if (i + 1 < step || (i + 1 === 2 && tripConfig.destination)) setStep(i + 1); }}
              style={{
                flex: 1, padding: '16px 12px',
                background: 'none', border: 'none',
                borderBottom: `2px solid ${step === i + 1 ? '#C9A96E' : 'transparent'}`,
                color: step === i + 1 ? '#C9A96E' : step > i + 1 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)',
                fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.3s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              <span style={{
                width: '22px', height: '22px', borderRadius: '50%',
                background: step > i + 1 ? '#C9A96E' : step === i + 1 ? 'rgba(201,169,110,0.2)' : 'rgba(255,255,255,0.08)',
                border: `1px solid ${step >= i + 1 ? '#C9A96E' : 'rgba(255,255,255,0.15)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: step > i + 1 ? '#0D0D0D' : '#C9A96E',
                fontSize: '0.65rem', fontWeight: 700, flexShrink: 0,
              }}>
                {step > i + 1 ? <i className="fas fa-check"></i> : i + 1}
              </span>
              <span className="wl-step-label">{s}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 2rem 80px' }}>

        {/* ─── STEP 1: SETUP ─────────────────────────────────────── */}
        {step === 1 && (
          <div style={{ maxWidth: '680px', margin: '0 auto' }} data-aos="fade-up">
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 400, color: textPrimary, marginBottom: '8px' }}>
              Tell Us About Your Trip
            </h2>
            <p style={{ color: textMuted, fontSize: '0.85rem', marginBottom: '32px', lineHeight: 1.7 }}>
              Fill in the basics and we'll set up your personalised itinerary builder.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Destination *</label>
                  <select
                    value={tripConfig.destination}
                    onChange={e => setTripConfig(c => ({ ...c, destination: e.target.value }))}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="">Select a destination</option>
                    {destinations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                    <option value="Custom">Custom destination</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Travel Style *</label>
                  <select
                    value={tripConfig.style}
                    onChange={e => setTripConfig(c => ({ ...c, style: e.target.value }))}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="">Choose style</option>
                    {['Luxury', 'Adventure', 'Cultural', 'Relaxation', 'Foodie', 'Family', 'Romantic'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Start Date</label>
                  <input type="date" value={tripConfig.startDate} onChange={e => setTripConfig(c => ({ ...c, startDate: e.target.value }))} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Travelers</label>
                  <select value={tripConfig.travelers} onChange={e => setTripConfig(c => ({ ...c, travelers: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {[1,2,3,4,5,6,'7+'].map(n => <option key={n} value={n}>{n} {n === 1 ? 'traveler' : 'travelers'}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Number of Days: <span style={{ color: '#C9A96E' }}>{tripConfig.days}</span></label>
                <input
                  type="range" min={1} max={21} value={tripConfig.days}
                  onChange={e => setTripConfig(c => ({ ...c, days: parseInt(e.target.value) }))}
                  style={{ width: '100%', accentColor: '#C9A96E', cursor: 'pointer', height: '4px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: textMuted, marginTop: '4px' }}>
                  <span>1 day</span><span>21 days</span>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Budget Range</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                  {['Budget', 'Moderate', 'Luxury', 'Ultra-Luxury'].map(b => (
                    <button
                      key={b}
                      onClick={() => setTripConfig(c => ({ ...c, budget: b }))}
                      style={{
                        padding: '10px 8px', border: `1px solid ${tripConfig.budget === b ? '#C9A96E' : border}`,
                        background: tripConfig.budget === b ? 'rgba(201,169,110,0.1)' : 'transparent',
                        color: tripConfig.budget === b ? '#C9A96E' : textMuted,
                        fontSize: '0.72rem', cursor: 'pointer', transition: 'all 0.2s',
                        fontFamily: "'DM Sans',sans-serif",
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (!tripConfig.destination || !tripConfig.style) {
                    addToast('Please select a destination and travel style.', 'error');
                    return;
                  }
                  setStep(2);
                  addToast(`Building your ${tripConfig.days}-day ${tripConfig.destination} itinerary!`, 'success');
                }}
                className="btn-gold"
                style={{ padding: '14px', fontSize: '0.78rem', marginTop: '8px' }}
              >
                Build My Itinerary →
              </button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: BUILD ─────────────────────────────────────── */}
        {step === 2 && (
          <div data-aos="fade-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 400, color: textPrimary, marginBottom: '4px' }}>
                  {tripConfig.destination} · {tripConfig.days} Days
                </h2>
                <p style={{ color: textMuted, fontSize: '0.82rem' }}>
                  {tripConfig.travelers} traveler{tripConfig.travelers > 1 ? 's' : ''} · {tripConfig.style} · {tripConfig.budget || 'Any budget'}
                </p>
              </div>
              <button onClick={() => setStep(3)} className="btn-gold" style={{ padding: '10px 24px', fontSize: '0.72rem' }}>
                View Summary →
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px' }}>
              {/* Activity palette */}
              <div>
                <div style={{ position: 'sticky', top: '100px' }}>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A96E', fontWeight: 700, marginBottom: '12px' }}>
                    Activities
                  </div>
                  <p style={{ fontSize: '0.74rem', color: textMuted, marginBottom: '16px', lineHeight: 1.6 }}>
                    Click an activity then choose a day to add it.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {ACTIVITIES.map(act => (
                      <button
                        key={act.id}
                        onClick={() => setDraggedActivity(draggedActivity?.id === act.id ? null : act)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '10px 12px',
                          background: draggedActivity?.id === act.id ? 'rgba(201,169,110,0.12)' : surface,
                          border: `1px solid ${draggedActivity?.id === act.id ? '#C9A96E' : border}`,
                          color: textPrimary, cursor: 'pointer', transition: 'all 0.2s',
                          textAlign: 'left', fontFamily: "'DM Sans',sans-serif",
                        }}
                      >
                        <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: catColors[act.category] || '#C9A96E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.7rem', color: '#0D0D0D' }}>
                          <i className={`fas fa-${act.icon}`}></i>
                        </span>
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>{act.label}</div>
                          <div style={{ fontSize: '0.68rem', color: textMuted }}>{act.duration}h · {act.category}</div>
                        </div>
                        {draggedActivity?.id === act.id && (
                          <i className="fas fa-check-circle" style={{ color: '#C9A96E', marginLeft: 'auto', fontSize: '0.8rem' }}></i>
                        )}
                      </button>
                    ))}
                  </div>
                  {draggedActivity && (
                    <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(201,169,110,0.1)', border: '1px solid #C9A96E', fontSize: '0.72rem', color: '#C9A96E', textAlign: 'center' }}>
                      <i className="fas fa-hand-pointer" style={{ marginRight: '6px' }}></i>
                      Now click a day to add "{draggedActivity.label}"
                    </div>
                  )}
                </div>
              </div>

              {/* Day columns */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {days.map((day, dayIdx) => {
                  const dayHours = day.activities.reduce((s, a) => s + a.duration, 0);
                  const isActive = activeDay === dayIdx;
                  return (
                    <div
                      key={day.dayNum}
                      style={{
                        background: surface, border: `1px solid ${isActive ? '#C9A96E' : border}`,
                        transition: 'border-color 0.2s',
                      }}
                    >
                      {/* Day header */}
                      <div
                        style={{
                          padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          borderBottom: `1px solid ${border}`, cursor: 'pointer',
                          background: isActive ? 'rgba(201,169,110,0.06)' : 'transparent',
                        }}
                        onClick={() => {
                          setActiveDay(isActive ? -1 : dayIdx);
                          if (draggedActivity) {
                            addActivity(draggedActivity, dayIdx);
                            addToast(`${draggedActivity.label} added to ${day.label}`, 'success');
                            setDraggedActivity(null);
                          }
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ width: '32px', height: '32px', background: '#C9A96E', color: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
                            {day.dayNum}
                          </span>
                          <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: textPrimary }}>{day.label}</div>
                            <div style={{ fontSize: '0.7rem', color: textMuted }}>{day.activities.length} activities · {dayHours}h</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          {draggedActivity && (
                            <span style={{ fontSize: '0.65rem', color: '#C9A96E', letterSpacing: '0.08em' }}>+ Add here</span>
                          )}
                          <i className={`fas fa-chevron-${isActive ? 'up' : 'down'}`} style={{ color: textMuted, fontSize: '0.75rem' }}></i>
                        </div>
                      </div>

                      {/* Activities */}
                      {(isActive || day.activities.length > 0) && (
                        <div style={{ padding: '12px 16px' }}>
                          {day.activities.length === 0 ? (
                            <div
                              style={{ padding: '20px', textAlign: 'center', border: `1px dashed ${border}`, color: textMuted, fontSize: '0.78rem', cursor: draggedActivity ? 'pointer' : 'default' }}
                              onClick={() => {
                                if (draggedActivity) {
                                  addActivity(draggedActivity, dayIdx);
                                  addToast(`${draggedActivity.label} added to ${day.label}`, 'success');
                                  setDraggedActivity(null);
                                }
                              }}
                            >
                              {draggedActivity ? `+ Drop "${draggedActivity.label}" here` : 'No activities yet — select one from the left'}
                            </div>
                          ) : (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                              {day.activities.map((act) => (
                                <div
                                  key={act.uid}
                                  style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    padding: '7px 12px',
                                    background: cardBg, border: `1px solid ${border}`,
                                    fontSize: '0.78rem',
                                  }}
                                >
                                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: catColors[act.category] || '#C9A96E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: '#0D0D0D', flexShrink: 0 }}>
                                    <i className={`fas fa-${act.icon}`}></i>
                                  </span>
                                  <span style={{ color: textPrimary }}>{act.label}</span>
                                  <span style={{ color: textMuted, fontSize: '0.68rem' }}>{act.duration}h</span>
                                  <button onClick={() => removeActivity(dayIdx, act.uid)} style={{ background: 'none', border: 'none', color: textMuted, cursor: 'pointer', fontSize: '0.7rem', padding: '0 2px' }}>
                                    <i className="fas fa-times"></i>
                                  </button>
                                </div>
                              ))}
                              {draggedActivity && (
                                <button
                                  onClick={() => { addActivity(draggedActivity, dayIdx); addToast(`${draggedActivity.label} added!`, 'success'); setDraggedActivity(null); }}
                                  style={{ padding: '7px 12px', border: `1px dashed #C9A96E`, background: 'rgba(201,169,110,0.08)', color: '#C9A96E', cursor: 'pointer', fontSize: '0.75rem' }}
                                >
                                  + Add {draggedActivity.label}
                                </button>
                              )}
                            </div>
                          )}
                          {isActive && (
                            <textarea
                              placeholder={`Notes for ${day.label}...`}
                              value={day.notes}
                              onChange={e => updateNote(dayIdx, e.target.value)}
                              rows={2}
                              style={{ ...inputStyle, resize: 'none', fontSize: '0.78rem', padding: '8px 12px' }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 3: SUMMARY ───────────────────────────────────── */}
        {step === 3 && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }} data-aos="fade-up">
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✈️</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.2rem', fontWeight: 400, color: textPrimary, marginBottom: '8px' }}>
                Your {tripConfig.destination} Itinerary
              </h2>
              <p style={{ color: textMuted, fontSize: '0.85rem' }}>
                {tripConfig.days} days · {tripConfig.travelers} traveler{tripConfig.travelers > 1 ? 's' : ''} · {tripConfig.style}
              </p>
            </div>

            {/* Summary stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
              {[
                { icon: 'calendar-alt', label: 'Total Days', value: tripConfig.days },
                { icon: 'tasks', label: 'Activities', value: totalActivities },
                { icon: 'clock', label: 'Hours Planned', value: `${totalHours}h` },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center', padding: '20px', background: surface, border: `1px solid ${border}` }}>
                  <i className={`fas fa-${s.icon}`} style={{ color: '#C9A96E', fontSize: '1.2rem', display: 'block', marginBottom: '8px' }}></i>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', color: '#C9A96E', fontWeight: 300 }}>{s.value}</div>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: textMuted, marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Day breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
              {days.map(day => (
                <div key={day.dayNum} style={{ padding: '16px', background: surface, border: `1px solid ${border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: day.activities.length ? '10px' : 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ width: '28px', height: '28px', background: '#C9A96E', color: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0 }}>
                        {day.dayNum}
                      </span>
                      <span style={{ fontWeight: 600, fontSize: '0.88rem', color: textPrimary }}>{day.label}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: textMuted }}>{day.activities.reduce((s, a) => s + a.duration, 0)}h</span>
                  </div>
                  {day.activities.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {day.activities.map(act => (
                        <span key={act.uid} style={{ fontSize: '0.72rem', padding: '4px 10px', background: cardBg, border: `1px solid ${border}`, color: textMuted }}>
                          {act.label} ({act.duration}h)
                        </span>
                      ))}
                    </div>
                  )}
                  {day.notes && <div style={{ marginTop: '8px', fontSize: '0.75rem', color: textMuted, fontStyle: 'italic' }}>📝 {day.notes}</div>}
                  {day.activities.length === 0 && <p style={{ fontSize: '0.75rem', color: textMuted, marginTop: '4px', marginBottom: 0 }}>Free day / to be planned</p>}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link
                to="/contact"
                className="btn-gold"
                style={{ display: 'block', textAlign: 'center', padding: '14px', fontSize: '0.78rem' }}
                onClick={() => addToast('Itinerary saved! Our team will review it.', 'success')}
              >
                <i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i>
                Send to WanderLux Travel Designer
              </Link>
              <button
                onClick={() => { setStep(2); setActiveDay(0); }}
                style={{ padding: '13px', border: `1px solid ${border}`, background: 'none', color: textMuted, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                ← Back to Edit
              </button>
              <button
                onClick={() => { setStep(1); setDays([]); setDraggedActivity(null); setTripConfig({ destination: '', startDate: '', days: 5, travelers: 2, style: '', budget: '' }); addToast('Planner reset.', 'info'); }}
                style={{ padding: '13px', border: `1px solid ${border}`, background: 'none', color: textMuted, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .wl-step-label { display: none; }
        }
        @media (max-width: 900px) {
          .trip-builder-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default TripPlanner;
