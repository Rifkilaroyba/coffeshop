/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D32F2F',
          dark: '#B71C1C',
          light: '#EF5350',
        },
        neutral: {
          DEFAULT: '#ffffff',
          dark: '#0F172A',
        },
        coffee: {
          DEFAULT: '#6F4E37',
          light: '#8B6B52',
          dark: '#4B3621',
        },
        leaf: '#2E7D32',
      },
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(0,0,0,0.25)',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'scale-in': 'scaleIn 0.2s ease-out forwards',
        'slide-up': 'slideUp 0.25s ease-out forwards',
      },
    },
  },
  plugins: [],
}
