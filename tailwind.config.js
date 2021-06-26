/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        whiteGray: '#DEDDDD',
        darkGray: '#3E3E3E',
        input: '#404040',
        green: '#58926F',
        blue: '#5A73A3',
        red: '#976C6C',
      },
      backgroundColor: {
        bgBlack: 'linear-gradient(298.31deg, #232323 20%, rgba(22, 22, 22, 0.78) 84.83%)',
      },

      boxShadow: {
        mainShadow: '5px 5px 10px rgba(0, 0, 0, 0.50)',
        inputShadow: '5px 5px 20px rgba(0, 0, 0, 0.8)',
        buttonShadow: '5px 5px 10px rgba(0, 0, 0, 0.20)',
      },
      gridTemplateRows: {
        desktop: '1fr 10fr 10fr',
        mobile: '130px 200px 250px 0px',
      },
      gridTemplateColumns: {
        desktop: '320px 1fr',
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
