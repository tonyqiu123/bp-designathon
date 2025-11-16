/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        accent: '#FFD700', // Yellow accent color
        'blue-bg': '#0056D6', // Blue background color from frontend
      },
    },
  },
  plugins: [],
}

