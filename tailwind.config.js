/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'app-primary': '#F90',
        'app-black': '#312E49'
      },
      fontFamily: {
        'inter': ['Inter'],
        'rubik': ['Rubik Variable'],
      }
    },
  },
  plugins: [],
}

