import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { team } from '../data';

const About = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (window.AOS) window.AOS.refresh();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: isDark ? '#0D0D0D' : '#F8F4EF', color: isDark ? '#E8E8E8' : '#1A1A1A' }}>
      {/* HERO */}
      <section className="relative h-screen flex items-end pb-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80')`,
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.75))' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <span className="section-label text-gold" data-aos="fade-up">Our Story</span>
          <h1
            className="hero-title text-white mt-4"
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Born from a Passion<br />
            <em style={{ color: '#C9A96E' }}>for Discovery</em>
          </h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <span className="section-label">Who We Are</span>
            <h2
              className="hero-title mt-4 mb-8"
              style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', color: isDark ? '#E8E8E8' : '#1A1A1A' }}
            >
              Architects of<br />Extraordinary Travel
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>
              <p>
                WanderLux began in 2009 when our founder Alexandra Winters returned from her 60th country with a simple conviction: the travel industry was failing the world's most curious minds.
              </p>
              <p>
                Package tours were impersonal. Booking platforms were transactional. Something essential — the art of truly experiencing a place — had been lost in the pursuit of scale.
              </p>
              <p>
                So she built something different. A small team of true travelers, each with deep expertise in specific regions and experiences, united by a singular obsession: crafting journeys that genuinely transform the people who take them.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4" data-aos="fade-left" data-aos-delay="200">
            <div style={{ height: '300px' }} className="overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80"
                alt="Travel"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div style={{ height: '300px', marginTop: '60px' }} className="overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80"
                alt="Destination"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section
        className="py-28"
        style={{ background: isDark ? '#0A0A0A' : '#1A1A1A' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                icon: 'compass',
                label: 'Our Mission',
                title: 'To Make Every Journey a Masterpiece',
                text: 'We exist to connect people with the world\'s most extraordinary places and experiences — thoughtfully, responsibly, and with the deepest respect for local cultures and environments.'
              },
              {
                icon: 'eye',
                label: 'Our Vision',
                title: 'A World Where Travel Transforms',
                text: 'We envision a future where every journey leaves both traveler and destination better than before — where authentic connection replaces consumption, and where the act of travel becomes a force for global good.'
              }
            ].map((item, i) => (
              <div
                key={i}
                className="p-10"
                style={{ border: '1px solid #2E2E2E' }}
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                <div className="text-gold text-2xl mb-6">
                  <i className={`fas fa-${item.icon}`}></i>
                </div>
                <div className="section-label mb-3 text-gold">{item.label}</div>
                <h3 className="font-display text-2xl text-white mb-4" style={{ fontWeight: 400 }}>{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '94', label: 'Countries', suffix: '+' },
              { num: '15,000', label: 'Travelers', suffix: '+' },
              { num: '16', label: 'Years', suffix: '' },
              { num: '47', label: 'Awards', suffix: '' },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center py-8 px-4"
                style={{ borderBottom: '2px solid #C9A96E' }}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div
                  className="font-display mb-2"
                  style={{ fontSize: '3.5rem', fontWeight: 300, color: '#C9A96E' }}
                >
                  {stat.num}{stat.suffix}
                </div>
                <div
                  className="text-xs tracking-widest uppercase"
                  style={{ color: isDark ? '#9A9A9A' : '#6B6B6B', letterSpacing: '0.15em' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label" data-aos="fade-up">What Drives Us</span>
          <h2
            className="hero-title mt-4"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: isDark ? '#E8E8E8' : '#1A1A1A' }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'heart', title: 'Authenticity', desc: 'We believe in real experiences over staged performances. Every destination we recommend, we\'ve personally explored and vetted.' },
            { icon: 'leaf', title: 'Sustainability', desc: 'Our carbon-neutral commitment means every journey contributes to conservation efforts and local community development.' },
            { icon: 'users', title: 'Partnership', desc: 'We work with local guides, family-owned properties, and social enterprises — ensuring travel benefits the communities we visit.' },
          ].map((val, i) => (
            <div
              key={i}
              className="p-8 text-center rounded-sm card-hover"
              style={{ background: isDark ? '#1E1E1E' : '#FFFFFF', border: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}` }}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 text-xl text-gold"
                style={{ background: isDark ? '#161616' : '#F8F4EF', border: '1px solid #C9A96E' }}>
                <i className={`fas fa-${val.icon}`}></i>
              </div>
              <h3 className="font-display text-xl mb-3" style={{ color: isDark ? '#E8E8E8' : '#1A1A1A', fontWeight: 400 }}>{val.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="py-28 px-6 lg:px-12" style={{ background: isDark ? '#161616' : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-label" data-aos="fade-up">The People</span>
            <h2
              className="hero-title mt-4 mb-6"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: isDark ? '#E8E8E8' : '#1A1A1A' }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Meet Our Team
            </h2>
            <div className="divider-gold" data-aos="fade-up" data-aos-delay="200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="text-center group card-hover"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="relative mb-6 overflow-hidden" style={{ height: '320px' }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(0,0,0,0.6)' }}
                  >
                    <a href={member.instagram} className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-black text-sm">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href={member.linkedin} className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-black text-sm">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
                <h3 className="font-display text-xl mb-1" style={{ color: isDark ? '#E8E8E8' : '#1A1A1A', fontWeight: 400 }}>{member.name}</h3>
                <div className="text-gold text-xs tracking-widest uppercase mb-3" style={{ letterSpacing: '0.1em' }}>{member.role}</div>
                <p className="text-xs leading-relaxed" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label" data-aos="fade-up">Recognition</span>
          <h2
            className="hero-title mt-4"
            style={{ fontSize: '2.5rem', color: isDark ? '#E8E8E8' : '#1A1A1A' }}
            data-aos="fade-up"
          >
            Awards & Accolades
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { award: 'World\'s Best Luxury Tour Operator', org: 'Travel + Leisure', year: '2024' },
            { award: 'Most Sustainable Travel Company', org: 'Condé Nast Traveller', year: '2024' },
            { award: 'Best Bespoke Travel Service', org: 'Forbes Travel Guide', year: '2023' },
            { award: 'Excellence in Customer Service', org: 'ATTA', year: '2023' },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center p-6"
              style={{ border: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}` }}
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <i className="fas fa-trophy text-gold text-2xl mb-4"></i>
              <div className="text-sm font-semibold mb-2" style={{ color: isDark ? '#E8E8E8' : '#1A1A1A' }}>{item.award}</div>
              <div className="text-xs text-gold mb-1">{item.org}</div>
              <div className="text-xs" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>{item.year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ background: '#C9A96E' }}>
        <h2 className="hero-title text-black mb-6" style={{ fontSize: '2.5rem' }} data-aos="fade-up">
          Let's Plan Your Next Adventure
        </h2>
        <p className="text-black opacity-70 mb-8 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          Speak with one of our travel designers today.
        </p>
        <Link
          to="/contact"
          className="inline-block px-12 py-4 bg-black text-white text-xs font-semibold tracking-widest uppercase transition-all hover:bg-opacity-80"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
};

export default About;
