/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emanuel: {
          dark: '#080d1a',
          navy: '#0f1c3f',
          blue: '#13285c',
          royal: '#1e3a8a',
          accent: '#2563eb',
          light: '#f1f5f9',
          gold: {
            light: '#fae39a',
            DEFAULT: '#d4af37',
            dark: '#b89020',
            deep: '#997517'
          }
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
        cinzel: ['Cinzel', 'serif']
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'card-dark': '0 20px 45px rgba(0, 0, 0, 0.45)',
        'blue-glow': '0 0 30px rgba(37, 99, 235, 0.25)'
      }
    },
  },
  plugins: [],
};
