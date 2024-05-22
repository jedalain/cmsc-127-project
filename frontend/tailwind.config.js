/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          'base127': '#fff4e6',
          'base127b': '#faeddc',
          'base127c': '#c7a571',
          'black127': '#242124',
          'red127': "#D04848",
          'green127': '#97BE5A',
        },
    },
  },
  plugins: [],
}

