/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "brand-heading": "url('/src/images/blood.webp')",
      },
    },
  },
  plugins: [],
};
