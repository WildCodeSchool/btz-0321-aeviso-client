/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        // bgImg: "url('./media/images/bgAevisioBlue.png')",
        // bgImg: "url('./media/images/bgAevisioGray.png')",
        bgImg: "url('./media/images/bgAevisioOriginal.png')",
      },
      // BlueVersion
      // colors: {
      //   whiteGray: '#DEDDDD',
      //   mainBg: '#0F1223',
      //   input: '#404040',
      //   componentBorder: '#333A5E',
      //   customGreen: '#58926F',
      //   customRed: '#976C6C',
      //   component: '#292D41',
      // },

      // GrayVersion
      // colors: {
      //   whiteGray: '#DEDDDD',
      //   mainBg: '#202225',
      //   input: '#404040',
      //   componentBorder: '#40434B',
      //   customGreen: '#58926F',
      //   customRed: '#976C6C',
      //   component: '#37393F',
      // },

      // OriginalVersion
      colors: {
        whiteGray: '#DEDDDD',
        mainBg: '#3E3E3E',
        input: '#404040',
        componentBorder: '#111111',
        customGreen: '#58926F',
        customRed: '#976C6C',
        component: '#111111',
      },
      boxShadow: {
        mainShadow: '5px 5px 10px rgba(0, 0, 0, 0.50)',
        inputShadow: '5px 5px 20px rgba(0, 0, 0, 0.6)',
        buttonShadow: '5px 5px 10px rgba(0, 0, 0, 0.20)',
      },
      gridTemplateRows: {
        desktop: '1fr 1fr',
        mobile: '130px 200px 420px 30px',
      },
      gridTemplateColumns: {
        desktop: '300px 1fr',
        phone: '1fr',
      },
      screens: {
        sm: '1200px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
