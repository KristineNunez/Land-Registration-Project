import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#1b5b24',
      secondary: '#13544e',
      accent: '#02fdaf',
      content: '#282728',
      dark: '#1c1b1c',
    },
  },
};
export const plugins = [
  require('flowbite/plugin'),
  plugin(({ matchUtilities, theme }) => {
    matchUtilities(
      {
        'animation-delay': (value) => {
          return {
            'animation-delay': `${value} !important`,
          };
        },
      },
      {
        values: theme('transitionDelay'),
      }
    );
  }),
  require('@tailwindcss/container-queries'),
];
