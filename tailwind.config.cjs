/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#FF8855',
        secondary: '#FFD8C7',
        primaryHover: '#FF6828',
        subText: '#898989',
        lightText: '#525252',
        redError: '#DB2017',
        redErrorHover: '#FF261C',
        greenSuccess: '#88EA5B',
        foodCard: '#FFA883',
        tagYellow: '#EAD35B',
        borderYellow: '#8F8137',
        borderGreen: '#45522C',
      },
      fontFamily: {
        lobster: ['Lobster'],
        inter: ['Inter'],
      },
      dropShadow: {
        '3xl': '0 4px 4px rgba(0, 0, 0, 0.25)',
        '4xl': ['0 35px 35px rgba(0, 0, 0, 0.25)', '0 45px 65px rgba(0, 0, 0, 0.15)'],
        'toTop': '0 -2px 10px rgba(0, 0, 0, 0.25)',
      },
      lineClamp: {
        10: '10',
      },
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      smd: '888px',
      mmd: '950px',
      md: '1060px',
      mlg: '1180px',
      lg: '1200px',
      xlg: '1220px',
      xxlg: '1300px',
      xx4lg: '1400px',
      xl: '1700px',
      xxl: '2000px',
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
