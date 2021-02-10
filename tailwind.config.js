module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      'mevo-main': '#00afdd',
    }),
    extend: {},
    fontFamily: {
      body: ['Titillium Web', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      visibility: ['hover'],
    },
  },
  plugins: [],
};
