import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import CurrencyWidget from '../components/CurrencyWidget';

const Contact = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { addToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', phone: '', destination: '', message: '', budget: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (window.AOS) window.AOS.refresh();
    window.scrollTo(0, 0);
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Enquiry sent! We\'ll be in touch within 24 hours.', 'success');
  };

  return (
    <div style={{ background: isDark ? '#0D0D0D' : '#F8F4EF', color: isDark ? '#E8E8E8' : '#1A1A1A' }}>
      {/* HERO */}
      <section className="relative flex items-end pb-20 overflow-hidden" style={{ height: '55vh' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920&q=80')`, backgroundAttachment: 'fixed' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.75))' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <span className="section-label text-gold" data-aos="fade-up">Let's Connect</span>
          <h1
            className="hero-title text-white mt-3"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Plan Your Journey
          </h1>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info */}
          <div data-aos="fade-right">
            <span className="section-label block mb-6">Get in Touch</span>
            <p className="text-sm leading-relaxed mb-8" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>
              Whether you have a destination in mind or simply a desire to travel, our team of expert travel designers is here to help craft your perfect journey.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { icon: 'map-marker-alt', label: 'Our Office', value: '18 Mayfair Lane\nLondon, W1K 3LP\nUnited Kingdom' },
                { icon: 'phone', label: 'Phone', value: '+44 20 7946 0391' },
                { icon: 'envelope', label: 'Email', value: 'hello@wanderlux.com' },
                { icon: 'clock', label: 'Hours', value: 'Mon–Fri: 9am–7pm GMT\nSat: 10am–5pm GMT' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-gold"
                    style={{ border: '1px solid #C9A96E' }}
                  >
                    <i className={`fas fa-${item.icon} text-sm`}></i>
                  </div>
                  <div>
                    <div className="text-xs tracking-widest uppercase mb-1 font-semibold" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B', fontSize: '0.65rem' }}>{item.label}</div>
                    <div className="text-sm whitespace-pre-line" style={{ color: isDark ? '#E8E8E8' : '#1A1A1A' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <div className="text-xs tracking-widest uppercase mb-4 font-semibold" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B', fontSize: '0.65rem' }}>Follow Our Journey</div>
              <div className="flex gap-3">
                {[
                  { icon: 'instagram', label: '@wanderlux' },
                  { icon: 'facebook-f', label: 'WanderLux' },
                  { icon: 'twitter', label: '@wanderlux' },
                  { icon: 'pinterest-p', label: 'WanderLux' },
                  { icon: 'youtube', label: 'WanderLux TV' },
                ].map(s => (
                  <a
                    key={s.icon}
                    href="#"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300 hover:bg-gold hover:text-black hover:border-gold"
                    style={{
                      border: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}`,
                      color: isDark ? '#9A9A9A' : '#6B6B6B'
                    }}
                  >
                    <i className={`fab fa-${s.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Currency Converter */}
            <div className="mt-8" data-aos="fade-up" data-aos-delay="200">
              <CurrencyWidget />
            </div>
          </div>

          {/* Form */}
          <div
            className="lg:col-span-2 p-8 lg:p-12 rounded-sm"
            style={{
              background: isDark ? '#1E1E1E' : '#FFFFFF',
              border: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}`
            }}
            data-aos="fade-left"
            data-aos-delay="200"
          >
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-check text-2xl text-black"></i>
                </div>
                <h3 className="font-display text-3xl mb-4" style={{ color: isDark ? '#E8E8E8' : '#1A1A1A', fontWeight: 400 }}>
                  Thank You!
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>
                  Your enquiry has been received. One of our travel designers will be in touch within 24 hours.
                </p>
                <button
                  className="btn-gold mt-8"
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', destination: '', message: '', budget: '' }); }}
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <>
                <h2
                  className="font-display text-2xl mb-2"
                  style={{ color: isDark ? '#E8E8E8' : '#1A1A1A', fontWeight: 400 }}
                >
                  Begin Your Journey
                </h2>
                <p className="text-sm mb-8" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>
                  Tell us about your dream trip and we'll make it a reality.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs tracking-widest uppercase block mb-2 font-semibold" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B', fontSize: '0.65rem' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Alexandra Hartwell"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-widest uppercase block mb-2 font-semibold" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B', fontSize: '0.65rem' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs tracking-widest uppercase block mb-2 font-semibold" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B', fontSize: '0.65rem' }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-widest uppercase block mb-2 font-semibold" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B', fontSize: '0.65rem' }}>
                        Dream Destination
                      </label>
                      <input
                        type="text"
                        name="destination"
                        value={form.destination}
                        onChange={handleChange}
                        placeholder="Santorini, Maldives..."
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs tracking-widest uppercase block mb-2 font-semibold" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B', fontSize: '0.65rem' }}>
                      Budget Range (per person)
                    </label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="form-input"
                      style={{ background: isDark ? '#1E1E1E' : '#FFFFFF' }}
                    >
                      <option value="">Select budget range</option>
                      <option value="2k-5k">$2,000 – $5,000</option>
                      <option value="5k-10k">$5,000 – $10,000</option>
                      <option value="10k-20k">$10,000 – $20,000</option>
                      <option value="20k+">$20,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs tracking-widest uppercase block mb-2 font-semibold" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B', fontSize: '0.65rem' }}>
                      Tell Us About Your Vision *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe your ideal journey — the experiences you want, the atmosphere you're seeking, any special occasions..."
                      className="form-input resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-gold w-full text-sm">
                    Send Enquiry
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="px-6 lg:px-12 pb-20 max-w-7xl mx-auto" data-aos="fade-up">
        <div
          className="rounded-sm overflow-hidden relative"
          style={{ height: '400px', background: isDark ? '#161616' : '#E8E0D5' }}
        >
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1579%2C51.5095%2C-0.1381%2C51.5175&layer=mapnik&marker=51.5135%2C-0.1480"
            width="100%"
            height="100%"
            style={{ border: 0, filter: isDark ? 'invert(0.9) hue-rotate(180deg)' : 'none' }}
            title="WanderLux Office"
          />
          <div
            className="absolute top-6 left-6 p-4"
            style={{ background: isDark ? '#1E1E1E' : '#FFFFFF', border: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}` }}
          >
            <div className="font-semibold text-sm mb-1" style={{ color: isDark ? '#E8E8E8' : '#1A1A1A' }}>WanderLux London</div>
            <div className="text-xs" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>18 Mayfair Lane, W1K 3LP</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-20 px-6 lg:px-12"
        style={{ background: isDark ? '#161616' : '#FFFFFF', borderTop: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}` }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label" data-aos="fade-up">FAQ</span>
            <h2
              className="hero-title mt-4"
              style={{ fontSize: '2.5rem', color: isDark ? '#E8E8E8' : '#1A1A1A' }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Common Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'How far in advance should I book?', a: 'For peak seasons and luxury properties, we recommend booking 6–12 months in advance. However, we\'re experts at creating exceptional last-minute journeys too.' },
              { q: 'Do you offer travel insurance?', a: 'Yes, we partner with leading insurers to offer comprehensive travel protection including cancellation, medical, and baggage cover.' },
              { q: 'Are your packages fully customizable?', a: 'Absolutely. Every element of your journey can be tailored — from the hotel category to daily activities, dining preferences, and pace of travel.' },
              { q: 'What is your cancellation policy?', a: 'Policies vary by supplier. We\'ll provide full transparency on terms at the time of booking and always advocate on your behalf.' },
            ].map((faq, i) => (
              <div
                key={i}
                className="p-6"
                style={{
                  border: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}`,
                  background: isDark ? '#1E1E1E' : '#FDFAF6'
                }}
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <div className="flex gap-3 items-start">
                  <span className="text-gold font-bold text-sm flex-shrink-0 mt-0.5">Q</span>
                  <div>
                    <div className="font-semibold text-sm mb-2" style={{ color: isDark ? '#E8E8E8' : '#1A1A1A' }}>{faq.q}</div>
                    <div className="text-sm leading-relaxed" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>{faq.a}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
