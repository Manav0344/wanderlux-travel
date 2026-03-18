# WanderLux Travel Website

## Live Demo : https://manav0344.github.io/wanderlux-travel/


A **full-featured luxury travel website** built with React, React Router, and Tailwind CSS.  
Dark/light theme · Animated counters · Interactive Trip Planner · Search overlay · Wishlist · Booking modal · Cookie banner · Photo lightbox · 10 pages.

---

## 🚀 Quick Start

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── App.js                        # Router + providers
├── index.js / index.css          # Entry + Tailwind + global styles
│
├── context/
│   ├── ThemeContext.js            # Dark/light toggle
│   ├── ToastContext.js            # Toast notification system
│   └── WishlistContext.js        # Saved destinations state
│
├── hooks/
│   └── useCountUp.js             # Animated number counter hook
│
├── components/
│   ├── Header.js                 # Sticky nav + search + wishlist
│   ├── Footer.js                 # Links + newsletter + weather widget
│   ├── ScrollToTopButton.js      # Fixed scroll-up button
│   ├── PageLoader.js             # Branded loading screen
│   ├── CookieBanner.js           # GDPR cookie consent
│   ├── SearchOverlay.js          # Full-screen search (Ctrl+K)
│   ├── WishlistDrawer.js         # Slide-in wishlist panel
│   ├── BookingModal.js           # 3-step booking enquiry modal
│   ├── Lightbox.js               # Photo gallery lightbox
│   ├── StatsCounter.js           # Animated stat counters
│   ├── WeatherWidget.js          # Destination weather lookup
│   └── CurrencyWidget.js         # Currency converter
│
└── pages/
    ├── Home.js                   # Hero + stats + destinations + testimonials
    ├── About.js                  # Story + team + awards + values
    ├── Destinations.js           # Filter/sort grid + list toggle + wishlist
    ├── Packages.js               # Package cards + booking + wishlist
    ├── Blog.js                   # Article grid + search + newsletter
    ├── Contact.js                # Form + map + FAQ + currency widget
    ├── Gallery.js                # Masonry grid + lightbox
    ├── TripPlanner.js            # 3-step interactive itinerary builder
    ├── Sitemap.js                # Full site overview + features list
    └── NotFound.js               # Custom 404 page
```

---

## ✨ Full Feature List

| Feature | Details |
|---|---|
| **10 Pages** | Home, About, Destinations, Packages, Blog, Contact, Gallery, Trip Planner, Sitemap, 404 |
| **Dark/Light Theme** | Persisted to localStorage, smooth transition |
| **Global Search** | Full-screen overlay, keyboard shortcut Ctrl+K, searches all content |
| **Wishlist** | Save destinations & packages, slide-in drawer, badge counter |
| **Booking Modal** | 3-step form: trip details → contact info → confirmation |
| **Trip Planner** | 3-step builder: setup → day-by-day activities → summary |
| **Animated Counters** | IntersectionObserver-triggered count-up animation |
| **AOS Animations** | Scroll-triggered entrance animations throughout |
| **Photo Lightbox** | Keyboard navigation, thumbnails, caption display |
| **Masonry Gallery** | Multi-column responsive layout with hover effects |
| **Weather Widget** | Simulated conditions for 8 destinations |
| **Currency Converter** | 6 currencies, real-time calculation |
| **Toast Notifications** | Success/error/info toasts with auto-dismiss |
| **Cookie Banner** | GDPR-style, session-persisted |
| **Filter & Sort** | Destinations, packages, and blog all filterable + sortable |
| **Grid/List Toggle** | Destinations page offers two view modes |
| **Parallax Hero** | Fixed-attachment backgrounds on all hero sections |
| **Card Hover Effects** | Lift + shadow + image zoom on all cards |
| **Scroll-to-Top** | Floating button appears after 400px scroll |
| **Responsive** | Mobile-first, all breakpoints covered |

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary Accent | `#C9A96E` (gold) |
| Dark Background | `#0D0D0D` |
| Light Background | `#F8F4EF` |
| Display Font | Cormorant Garamond |
| Heading Font | Playfair Display |
| Body Font | DM Sans |

---

## 🛠 Tech Stack

- **React 18** — UI framework
- **React Router v6** — client-side routing
- **Tailwind CSS** — utility styling
- **AOS** — scroll animations (CDN)
- **Font Awesome** — icons (CDN)
- **Google Fonts** — typography (CDN)
- **Unsplash** — placeholder images

---

## 🚢 Production Build

```bash
npm run build
```
