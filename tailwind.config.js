/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          navy: '#0B1A30',
          blue: '#1A365D',
          gold: '#C5A059',
          champagne: '#F4EFEA',
          charcoal: '#2C3E50',
          frost: '#F8F9FA',
        },
        navy: {
          50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8',
          500: '#1e3a5f', 600: '#172e4d', 700: '#102240', 800: '#0b1a30', 900: '#061020',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
