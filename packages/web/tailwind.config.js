/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg_page1: 'var(--bg_page1)',
        bg_page2: 'var(--bg_page2)',
        bg_element1: 'var(--bg_element1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'ui-sans-serif', 'sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
