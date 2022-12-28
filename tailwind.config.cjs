/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#FF8855",
        secondary: '#FFD8C7',
        subText: "#898989",
        lightText: "#525252",
        redError: '#DB2017',
        greenSuccess: '#88EA5B',
        foodCard: '#FFA883',
        tagYellow: "#EAD35B",
        borderYellow:"#8F8137",
        borderGreen:"#45522C",

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
