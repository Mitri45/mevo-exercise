/* eslint-disable*/
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    backgroundColor: (theme) => ({
      ...theme('colors'),
      'mevo-main': '#00afdd',
    }),
    extend: {
      keyframes: {
        doBounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      animation: {
        'car-found': 'doBounce 3s 3',
      },
    },
    fontFamily: {
      body: ['Titillium Web', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      visibility: ['hover'],
    },
  },
};
