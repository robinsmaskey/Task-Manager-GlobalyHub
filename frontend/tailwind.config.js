// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,ts,jsx,tsx}"],
//   theme: { extend: {} },
//   plugins: [],
// };


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',  // enable toggling dark/light with a class
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2dd4bf',        // teal-ish
          light: '#5eead4',
          dark: '#0f766e'
        },
        'priority-high-bg': '#fef2f2',
        'priority-high-text': '#991b1b',
        'priority-med-bg': '#fffbeb',
        'priority-med-text': '#92400e',
        'priority-low-bg': '#ecfdf5',
        'priority-low-text': '#064e3b',
        completed: '#d1fae5',
        completedText: '#065f46'
      }
    }
  },
  plugins: []
};
