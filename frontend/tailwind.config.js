/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base127: "#fff4e6",
        base127b: "#faeddc",
        base127b2: "#F5E6CF",
        base127c: "#eddbc2",
        base127d: "#bf9c67",
        black127: "#242124",
        gray127: "#787578",
        red127: "#D04848",
        red127b: "#f74d40",
        orange127z: "#fcc36a",
        orange127: "#F3B95F",
        orange127a: "#ebaf52",
        orange127c: "#BC6C25",
        green127: "#97BE5A",
        blue127: "#6895D2",
        blue127b: "#5a87c4",
      },

      screens: {
        xxs: "300px",
        xs: "500px",
      },
    },
  },
  plugins: [],
};
