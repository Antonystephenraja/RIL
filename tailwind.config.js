/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Define custom font families here
        sans: ["Satoshi", "Roboto", "Helvetica", "Arial", "sans-serif"],
        serif: ["Merriweather", "serif"],
        custom: ['"Open Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
