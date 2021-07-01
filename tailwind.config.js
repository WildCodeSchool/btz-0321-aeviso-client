/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        darkGray: '#3E3E3E',
        input: '#404040',
        green: '#58926F',
        blue: '#5A73A3',
        red: '#976C6C',
      },
      boxShadow: {
        mainShadow: '10px 10px 20px rgba(0, 0, 0, 0.50)',
        inputShadow: '5px 5px 20px rgba(0, 0, 0, 0.8)',
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
