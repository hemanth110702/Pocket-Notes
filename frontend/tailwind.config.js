/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lobster: ["Lobster", "sans-serif"],
      },
      screens: {
        ssm: "355px",
        nssm: "470px",
      },
    },
  },
  plugins: [],
};
