/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'sm': '400px',
      // => @media (min-width: 640px) { ... }

      'first': '1350px',
      // => @media (min-width: 1024px) { ... }

      'second': '1300px',
      // => @media (min-width: 1280px) { ... }

      'seventh' : '700px',
      'sixth' : '770px',
      'fifth' : '870px',
      'fourth' : '1000px',
      'third' : '1175px',
    },
    extend: {},
  },
  plugins: [],
}
