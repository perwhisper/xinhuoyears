/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px', // 增加超小屏幕断点
      },
      fontFamily: {
        brush: ['"Ma Shan Zheng"', 'cursive'],
        serif: ['"Noto Serif SC"', 'serif'],
        sans: ['"Noto Sans SC"', 'sans-serif'],
      },
      colors: {
        'xh-red': '#B03031',
        'xh-yellow': '#FBC84B',
        'xh-green': '#529850',
        'xh-blue': '#3C4EB2',
        'guochao-cream': '#EFE6DA',
      }
    },
  },
  plugins: [],
}