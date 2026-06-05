/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'sans-serif'],
        mono:  ['DM Mono', 'monospace'],
      },
      colors: {
        cream:      '#F5F0E8',
        beige:      '#EDE5D4',
        paper:      '#FAF7F2',
        tan:        '#D4C5A9',
        brown:      '#8B7355',
        'dark-brown':'#4A3728',
        'warm-gray':'#9E9589',
        ink:        '#2C2318',
      },
    },
  },
  plugins: [],
};
