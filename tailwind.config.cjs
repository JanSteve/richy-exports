/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: { DEFAULT: '#C8501A', bright: '#E06020' },
        gold: { DEFAULT: '#D4A853', bright: '#E8C068', pale: '#F0D890', dim: '#9A7830' },
        turmeric: '#E8A817',
        cinnamon: '#8B1A1A',
        cardamom: '#1B5E3A',
        pepper: '#2D2520',
        cream: { DEFAULT: '#FBF7F0', dark: '#F2EBD9' },
        midnight: '#0C0A08',
        ebony: '#151210',
        charcoal: '#1E1A16',
        ash: '#282420',
        stone: '#B8A898',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'gold-shimmer': 'goldShimmer 4s linear infinite',
      },
    },
  },
  plugins: [],
};
