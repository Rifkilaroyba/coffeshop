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
    },
  },
  plugins: [],
}


