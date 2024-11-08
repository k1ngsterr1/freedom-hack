/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4FB84F", // Bright blue for primary actions and highlights
        secondary: "#045433", // Deep purple for secondary elements or accenting
        background: "#FAFAFA", // Very light gray for a clean background
        text: "#111827", // Dark gray for readable text
      },
    },
  },
  plugins: [],
};
