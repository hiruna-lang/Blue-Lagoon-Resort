/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef4ff',
          100: '#dbe9ff',
          200: '#b8d5ff',
          300: '#89baff',
          400: '#5697f8',
          500: '#2e72e8',
          600: '#1e58c0',
          700: '#194798',
          800: '#173a7a',
          900: '#10254f',
          950: '#081126'
        },
        lagoon: '#7bdff2',
        sand: '#f9efe3',
        gold: '#d4af37'
      },
      boxShadow: {
        luxury: '0 20px 60px rgba(16, 37, 79, 0.18)'
      },
      backgroundImage: {
        'resort-gradient': 'linear-gradient(135deg, rgba(8,17,38,0.96), rgba(16,37,79,0.82), rgba(123,223,242,0.25))',
        'gold-shine': 'linear-gradient(135deg, #f5d77a, #d4af37, #b88a15)'
      }
    }
  },
  plugins: []
};
