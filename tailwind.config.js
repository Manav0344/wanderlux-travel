/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A96E',
          light: '#E8D5B0',
          dark: '#A07840',
        },
        dark: {
          bg: '#0D0D0D',
          surface: '#161616',
          card: '#1E1E1E',
          border: '#2E2E2E',
        },
        light: {
          bg: '#F8F4EF',
          surface: '#FFFFFF',
          card: '#FDFAF6',
          border: '#E8E0D5',
        }
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        heading: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.8s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
};
