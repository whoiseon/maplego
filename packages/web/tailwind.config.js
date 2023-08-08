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
        bg_element2: 'var(--bg_element2)',
        text1: 'var(--text1)',
        text2: 'var(--text2)',
        text3: 'var(--text3)',
        text4: 'var(--text4)',
        buttonText: 'var(--button-text)',
        border1: 'var(--border1)',
        border2: 'var(--border2)',
        border3: 'var(--border3)',
        border4: 'var(--border4)',
        primary1: 'var(--primary1)',
        primary2: 'var(--primary2)',
        danger1: 'var(--danger1)',
        danger2: 'var(--danger2)',
      },
      boxShadow: {
        shadow1: 'var(--shadow1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        iconSpin: 'iconSpin 0.25s ease-in-out',
      },
      keyframes: {
        iconSpin: {
          '0%': { transform: 'scale(0) rotate(180deg)', opacity: 0 },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: 1 },
        },
      },
      fontFamily: {
        pretendard: ['Pretendard', 'ui-sans-serif', 'sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
