/ @type {import('tailwindcss').Config} */
export default {
content: [
"./index.html",
"./src//*.{js,ts,jsx,tsx}",
],
theme: {
extend: {
    fontFamily: {
        avenir: ['AvenirHeavy', 'sans-serif'],
      },
      keyframes: {
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
      animation: {
        'slide-in-left': 'slide-in-left 0.5s ease-out',
      },
},
},
plugins: [],
}