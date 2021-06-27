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
        bgdark: "url('./media/images/bgAevisio.png')",
      },
      colors: {
        whiteGray: '#DEDDDD',
        darkGray: '#0F1223',
        input: '#404040',
        green: '#58926F',
        blue: '#333A5E',
        lightblue: '#6B77BF',
        red: '#976C6C',
        black: '#292D41',
      },
      boxShadow: {
        mainShadow: '5px 5px 10px rgba(0, 0, 0, 0.50)',
        inputShadow: '5px 5px 20px rgba(0, 0, 0, 0.6)',
        buttonShadow: '5px 5px 10px rgba(0, 0, 0, 0.20)',
      },
      gridTemplateRows: {
        desktop: '1fr 10fr 10fr',
        mobile: '130px 200px 420px 30px',
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
