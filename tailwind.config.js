/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: { light: '#F5E6D3', DEFAULT: '#D4A373', dark: '#9C6644' },
        secondary: { light: '#A7C957', DEFAULT: '#386641', dark: '#2D4A3E' },
        accent: { light: '#BDE0FE', DEFAULT: '#90E0EF', dark: '#48CAE4' }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
} 