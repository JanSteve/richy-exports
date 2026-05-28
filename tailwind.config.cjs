/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#825500',
          container: '#c18b37',
          fixed: '#ffddb2',
          'fixed-dim': '#f8bc63',
        },
        secondary: {
          DEFAULT: '#466557',
          container: '#c5e7d6',
          fixed: '#c8ead8',
          'fixed-dim': '#adcebd',
        },
        tertiary: {
          DEFAULT: '#5f5e5e',
          container: '#979595',
          fixed: '#e5e2e1',
          'fixed-dim': '#c8c6c5',
        },
        surface: {
          DEFAULT: '#fbf9f4',
          dim: '#dbdad5',
          bright: '#fbf9f4',
          container: '#f0eee9',
          'container-low': '#f5f3ee',
          'container-lowest': '#ffffff',
          'container-high': '#eae8e3',
          'container-highest': '#e4e2dd',
        },
        'on-surface': {
          DEFAULT: '#1b1c19',
          variant: '#504537',
        },
        outline: {
          DEFAULT: '#827565',
          variant: '#d4c4b2',
        },
        saffron: '#C8501A',
        midnight: '#1B1C19',
      },
      borderRadius: {
        DEFAULT: '0rem',
        lg: '0rem',
        xl: '0rem',
        full: '9999px',
      },
      fontFamily: {
        display: ['Bodoni Moda', 'serif'],
        body: ['Hanken Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        // Design system specific font classes
        'headline-md': ['Bodoni Moda', 'serif'],
        'display-lg-mobile': ['Bodoni Moda', 'serif'],
        'technical-data': ['JetBrains Mono', 'monospace'],
        'body-lg': ['Hanken Grotesk', 'sans-serif'],
        'body-md': ['Hanken Grotesk', 'sans-serif'],
        'headline-sm': ['Bodoni Moda', 'serif'],
        'label-caps': ['JetBrains Mono', 'monospace'],
        'display-lg': ['Bodoni Moda', 'serif'],
      },
      spacing: {
        'stack-lg': '120px',
        unit: '8px',
        gutter: '32px',
        'container-max': '1440px',
        'margin-desktop': '80px',
        'margin-mobile': '20px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'shimmerBar': 'shimmerBar 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
