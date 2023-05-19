/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      poppins: ["Poppins"],
      consolas: ["Consolas"],
    },
    extend: {
      screens: {
        xs: "576px",
        "10xl": "4096px",
      },
      spacing: {
        "nav-height": "var(--nav-height)",
      },
      colors: {
        "hue-color": "var(--hue-color)",
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "text-color": "var(--text-color)",
        "block-color": "var(--block-color)",
        "block-color-alt": "var(--block-color-alt)",
        "body-color-1": "var(--body-color-1)",
        "body-color-2": "var(--body-color-2)",
      },
    },
  },
  plugins: [],
};
