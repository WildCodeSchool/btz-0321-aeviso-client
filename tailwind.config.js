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
      },
      boxShadow: {
        mainShadow: '10px 10px 20px rgba(0, 0, 0, 0.50)',
      },
      gridTemplateRows: {
        desktop: '1fr 4fr 5fr',
        mobile: '130px 200px 250px 400px',
      },
      gridTemplateColumns: {
        desktop: '48% 48%',
        phone: '1fr',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
