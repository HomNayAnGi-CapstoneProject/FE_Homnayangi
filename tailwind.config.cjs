/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#FF8855",
        secondary: '#FFD8C7',
        primaryHover: '#FF6828',
        subText: "#898989",
        redError: '#DB2017',
        greenSuccess: '#88EA5B',
      },
      fontFamily: {
        lobster: ["Lobster"],
        inter: ["Inter"]
      },
      dropShadow: {
        '3xl': '0 4px 4px rgba(0, 0, 0, 0.25)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },
      lineClamp: {
        10: '10',
      }
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
  plugins: [require('@tailwindcss/line-clamp'),],
}
