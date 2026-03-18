import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import StatsCounter from '../components/StatsCounter';
import { destinations, testimonials } from '../data';

const Home = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toggle, isWished } = useWishlist();
  const { addToast } = useToast();

  useEffect(() => {
    if (window.AOS) window.AOS.refresh();
  }, []);

  const featured = destinations.filter(d => d.featured).slice(0, 4);

  return (
    <div className={isDark ? 'bg-dark-bg' : 'bg-light-bg'}>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')`,
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.8) 100%)' }} />

        {/* Decorative lines */}
        <div className="absolute left-12 top-1/4 bottom-1/4 w-px opacity-20" style={{ background: 'linear-gradient(to bottom, transparent, #C9A96E, transparent)' }} />
        <div className="absolute right-12 top-1/4 bottom-1/4 w-px opacity-20" style={{ background: 'linear-gradient(to bottom, transparent, #C9A96E, transparent)' }} />

        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-6">
          <div data-aos="fade-down" data-aos-duration="800">
            <span className="section-label text-gold-light">Est. 2009 · Award-Winning Travel</span>
          </div>

          <h1
            className="hero-title text-white mt-6 mb-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Where Every Journey<br />
            <em style={{ color: '#C9A96E', fontStyle: 'italic' }}>Becomes Legendary</em>
          </h1>

          <p
            className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto leading-relaxed font-light"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            We craft bespoke travel experiences for those who seek extraordinary moments beyond the ordinary world.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <Link to="/destinations" className="btn-gold">
              Explore Destinations
            </Link>
            <Link to="/packages" className="btn-outline text-white border-white hover:bg-white hover:text-black">
              View Packages
            </Link>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-8 mt-20 pt-12"
            style={{ borderTop: '1px solid rgba(201,169,110,0.2)' }}
            data-aos="fade-up"
            data-aos-delay="800"
          >
            {[
              { num: '94+', label: 'Countries' },
              { num: '15K+', label: 'Happy Travelers' },
              { num: '16', label: 'Years Experience' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-4xl text-gold" style={{ fontWeight: 300 }}>{stat.num}</div>
                <div className="text-xs text-gray-400 tracking-widest mt-1 uppercase" style={{ letterSpacing: '0.15em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white opacity-60">
          <span className="text-xs tracking-widest uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}>Scroll</span>
          <div className="w-px h-12 bg-gold opacity-60" style={{ animation: 'pulse 2s infinite' }} />
        </div>
      </section>

      {/* ANIMATED STATS */}
      <StatsCounter stats={[
        { target: 94,    suffix: '+',  label: 'Countries' },
        { target: 15000, suffix: '+',  label: 'Happy Travelers' },
        { target: 16,    suffix: '',   label: 'Years Experience' },
        { target: 47,    suffix: '',   label: 'Industry Awards' },
        { target: 98,    suffix: '%',  label: 'Satisfaction Rate' },
      ]} />

      {/* FEATURED DESTINATIONS */}
      <section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label" data-aos="fade-up">Handpicked</span>
          <h2
            className="hero-title mt-4 mb-6"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: isDark ? '#E8E8E8' : '#1A1A1A'
            }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Featured Destinations
          </h2>
          <div className="divider-gold" data-aos="fade-up" data-aos-delay="200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((dest, i) => (
            <div
              key={dest.id}
              className="card-hover cursor-pointer group"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="img-overlay rounded-sm overflow-hidden" style={{ height: '380px' }}>
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Wishlist heart */}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggle(dest);
                    addToast(isWished(dest.id) ? `${dest.name} removed` : `${dest.name} saved to wishlist!`, isWished(dest.id) ? 'info' : 'success');
                  }}
                  style={{
                    position: 'absolute', top: '12px', right: '12px', zIndex: 20,
                    width: '34px', height: '34px', borderRadius: '50%',
                    background: 'rgba(0,0,0,0.55)', border: 'none',
                    color: isWished(dest.id) ? '#E87070' : '#fff',
                    cursor: 'pointer', fontSize: '0.85rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <i className={`fa${isWished(dest.id) ? 's' : 'r'} fa-heart`}></i>
                </button>
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                  <div className="tag mb-2 w-fit">{dest.category}</div>
                  <h3 className="text-white font-display text-xl mb-1" style={{ fontWeight: 400 }}>{dest.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <i className="fas fa-star star text-xs"></i>
                      <span className="text-white text-xs">{dest.rating}</span>
                    </div>
                    <span className="text-gold text-sm font-semibold">{dest.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12" data-aos="fade-up">
          <Link to="/destinations" className="btn-outline" style={{ color: isDark ? '#E8E8E8' : '#1A1A1A', borderColor: isDark ? '#2E2E2E' : '#E8E0D5' }}>
            View All Destinations
          </Link>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section
        className="py-28 relative overflow-hidden"
        style={{ background: isDark ? '#0A0A0A' : '#1A1A1A' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div data-aos="fade-right">
              <span className="section-label">Our Philosophy</span>
              <h2
                className="hero-title text-white mt-4 mb-6"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              >
                Travel as a Form of<br />
                <em style={{ color: '#C9A96E' }}>Fine Art</em>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                We believe travel should be transformative, not transactional. Every WanderLux journey is a carefully composed masterpiece — where world-class accommodation, private access, and deeply personal experiences combine to create something truly unforgettable.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: 'gem', label: 'Luxury Curated', desc: 'Only the finest properties and experiences' },
                  { icon: 'user-tie', label: 'Personal Service', desc: 'Your dedicated travel designer' },
                  { icon: 'shield-alt', label: 'Fully Protected', desc: 'ATOL protected for peace of mind' },
                  { icon: 'leaf', label: 'Sustainable', desc: 'Carbon neutral since 2020' },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1" style={{ color: '#C9A96E' }}>
                      <i className={`fas fa-${item.icon}`}></i>
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold mb-1">{item.label}</div>
                      <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-gold">Learn Our Story</Link>
            </div>

            <div
              className="relative"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-sm overflow-hidden" style={{ height: '280px', marginTop: '60px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80"
                    alt="Luxury experience"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-sm overflow-hidden" style={{ height: '280px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80"
                    alt="Beautiful destination"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Gold accent box */}
              <div
                className="absolute -bottom-8 -right-8 w-32 h-32 flex items-center justify-center text-center"
                style={{ background: '#C9A96E' }}
              >
                <div>
                  <div className="font-display text-3xl text-black" style={{ fontWeight: 300 }}>16+</div>
                  <div className="text-black text-xs font-semibold tracking-widest uppercase" style={{ fontSize: '0.6rem' }}>Years of<br />Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="section-label" data-aos="fade-up">Stories</span>
            <h2
              className="hero-title mt-4 mb-6"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: isDark ? '#E8E8E8' : '#1A1A1A'
              }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Traveler Testimonials
            </h2>
            <div className="divider-gold" data-aos="fade-up" data-aos-delay="200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-8 rounded-sm relative"
                style={{
                  background: isDark ? '#1E1E1E' : '#FFFFFF',
                  border: `1px solid ${isDark ? '#2E2E2E' : '#E8E0D5'}`
                }}
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                <div className="quote-mark leading-none mb-4">"</div>
                <p
                  className="text-sm leading-relaxed mb-6 italic"
                  style={{ color: isDark ? '#B0B0B0' : '#4A4A4A' }}
                >
                  {t.text}
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: isDark ? '#E8E8E8' : '#1A1A1A' }}>{t.name}</div>
                    <div className="text-xs" style={{ color: isDark ? '#9A9A9A' : '#6B6B6B' }}>{t.location}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, j) => (
                      <i key={j} className="fas fa-star star text-xs"></i>
                    ))}
                  </div>
                  <span className="tag text-xs">{t.trip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section
        className="relative py-28 overflow-hidden"
        style={{
          background: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80') center/cover no-repeat`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.65)' }} />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <span className="section-label text-gold" data-aos="fade-up">Start Your Journey</span>
          <h2
            className="hero-title text-white mt-4 mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Your Dream Trip Awaits
          </h2>
          <p
            className="text-gray-300 mb-10 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Speak with our expert travel designers and let us create a bespoke journey crafted entirely around your vision.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Link to="/contact" className="btn-gold">Plan Your Journey</Link>
            <Link to="/packages" className="btn-outline text-white border-white hover:bg-white hover:text-black">
              Browse Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
