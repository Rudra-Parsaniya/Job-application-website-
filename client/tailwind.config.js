export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#103640',
          dark: '#0a232a',
        },
        secondary: {
          DEFAULT: '#1E6772',
        },
        accent: {
          DEFAULT: '#67B5C5',
          light: '#8bc8d4',
        },
        background: {
          DEFAULT: '#F7F7F5',
        },
        soft: {
          DEFAULT: '#97A588',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(16, 54, 64, 0.08)',
        'premium': '0 10px 30px -4px rgba(16, 54, 64, 0.1)',
      }
    },
  },
  plugins: [],
}
