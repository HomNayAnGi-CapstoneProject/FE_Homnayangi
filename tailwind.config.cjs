/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#FF8855",
        subText: "#898989",
        redError: '#DB2017',
        greenSuccess: '#88EA5B',
      },
      fontFamily: {
        lobster: ["Lobster"],
        inter: ["Inter"]
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      smd: "888px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}
