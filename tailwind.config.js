const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '475px',
      // => @media (min-width: 640px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        primary: ['var(--font-inter)', fontFamily.sans],
      },
      colors: {
        violet: {
          DEFAULT: '#553CB9',
          30: '#7763c7',
          40: '#6650c0',
          50: '#553cb9',
          60: '#4d36a7',
          70: '#4d36a7',
        },
        yellow: {
          DEFAULT: '#FFC700',
        },
        base: {
          DEFAULT: 'black',
          surface: '#F9FAFB',
          light: '#F0F2F5',
          outline: '#E4E7EB',
          inline: '#D1D5DC',
          icon: '#9AA2B1',
          secondary: '#687083',
          label: '#1A3650',
          primary: '#092540',
          white: '#fff',
        },
      },
      boxShadow: {
        pendaftaran:
          '0px 0.5px 2px rgba(65, 78, 98, 0.12), 0px 0px 1px rgba(65, 78, 98, 0.05)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
