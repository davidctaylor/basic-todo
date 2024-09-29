const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addComponents }) {
      addComponents({
        '.todo-button': {
          '@apply h-[40px] px-4 bg-indigo-800 text-white rounded-full self-end':  {},
        },
        '.todo-button.disabled': {
          '@apply bg-indigo-100':  {},
        },
        '.todo-button.secondary': {
          '@apply bg-indigo-500':  {},
        },
      })
    })
  ],
};
