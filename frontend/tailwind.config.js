/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43', // Coursera-like deep blue
          DEFAULT: '#0056D2', // Coursera Primary Blue
        },
        secondary: '#F2D024',
        background: '#F5F7F8',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    }
  },
  plugins: []
};
