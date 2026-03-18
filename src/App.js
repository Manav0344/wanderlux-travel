import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import PageLoader from './components/PageLoader';
import CookieBanner from './components/CookieBanner';
import Home from './pages/Home';
import About from './pages/About';
import Destinations from './pages/Destinations';
import Packages from './pages/Packages';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import TripPlanner from './pages/TripPlanner';
import Sitemap from './pages/Sitemap';
import NotFound from './pages/NotFound';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const AOSInit = () => {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 80 });
    }
  }, []);
  return null;
};

const AppLayout = () => {
  const { theme } = useTheme();
  return (
    <div className={theme} style={{ minHeight: '100vh' }}>
      <Header />
      <main>
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/about"        element={<About />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/packages"     element={<Packages />} />
          <Route path="/blog"         element={<Blog />} />
          <Route path="/contact"      element={<Contact />} />
          <Route path="/gallery"      element={<Gallery />} />
          <Route path="/planner"      element={<TripPlanner />} />
          <Route path="/sitemap"      element={<Sitemap />} />
          <Route path="*"             element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
      <CookieBanner />
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);
  if (loading) return <PageLoader />;
  return (
    <ThemeProvider>
      <WishlistProvider>
        <ToastProvider>
          <Router>
            <ScrollToTop />
            <AOSInit />
            <AppLayout />
          </Router>
        </ToastProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;
