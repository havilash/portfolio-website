/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'poppins': ['Poppins'],
      'consolas': ['Consolas'],
    },
    extend: {
      screens: {
        'xs': '576px', // min-width
      },
      spacing: {
        'nav-height': 'var(--nav-height)'
      },
      colors: {
        'hue-color': 'var(--hue-color)',
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'text-color': 'var(--text-color)',
        'title-color': 'var(--title-color)',
        'box-color': 'var(--box-color)',
        'body-color-1': 'var(--body-color-1)',
        'body-color-2': 'var(--body-color-2)',
        'nav-bg-color': 'var(--nav-bg-color)',
      },
    },
  },
  plugins: [],
}