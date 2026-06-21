/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#e8f7f2',
          100: '#c4ebdf',
          200: '#9ddcc9',
          300: '#6ecdb2',
          400: '#3cbe9a',
          500: '#1D9E75',
          600: '#168560',
          700: '#0f6b4d',
          800: '#09523b',
          900: '#053929',
        },
        navy: {
          700: '#1e3a4f',
          800: '#152d3e',
          900: '#0f2132',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':  'fadeIn 0.4s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(16px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
};
