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
        primary: "#3A86FF", // Bright blue for primary actions and highlights
        secondary: "#8338EC", // Deep purple for secondary elements or accenting
        background: "#FAFAFA", // Very light gray for a clean background
        text: "#333333", // Dark gray for readable text
      },
    },
  },
  plugins: [],
};
