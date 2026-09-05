/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Instrument Serif', 'serif'],
      },
      colors: {
        bg: '#0e0e0e',
        fg: '#f0ebe3',
        accent: '#c45d3e',
        muted: '#b8b0a4',
      },
    },
  },
  plugins: [],
}