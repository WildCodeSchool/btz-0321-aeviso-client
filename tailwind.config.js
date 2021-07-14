/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      backgroundImage: (_theme) => ({
        bgImg: "url('/media/images/bgAevisoOriginal.webp')",
      }),
      colors: {
        whiteGray: '#DEDDDD',
        mainBg: '#202225',
        input: '#202225',
        whiteInput: '#858585',
        componentBorder: '#37393F',
        customGreen: '#58926F',
        customRed: '#976C6C',
        customBlue: '#5A73A3',
        component: '#37393F',
      },
      boxShadow: {
        mainShadow: '5px 5px 10px rgba(0, 0, 0, 0.50)',
        inputShadow: '5px 5px 20px rgba(0, 0, 0, 0.6)',
        buttonShadow: '5px 5px 10px rgba(0, 0, 0, 0.20)',
      },
      gridTemplateRows: {
        desktop: '1fr 1fr',
        mobile: '130px full',
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
    extend: {
      boxShadow: ['dark'],
    },
  },
  plugins: [],
};
