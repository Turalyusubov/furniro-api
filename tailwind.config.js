/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ochre': '#B88E2F',
        'dark-text': '#333',

      }
    },
  },
  plugins: [],
}

