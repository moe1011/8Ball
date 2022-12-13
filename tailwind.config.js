/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadein: {
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" },
        },
        fadeout: {
          "0%": { opacity: "100%" },
          "100%": { opacity: "0%" },
        },
        fadeinout: {
          "0%": { opacity: "0%" },
          "50%": { opacity: "100%" },
          "100%": { opacity: "0%" },
        },
      },
      animation: {
        "fade-in": "fadein 1s ease-in-out forwards",
        "fade-out": "fadeout 1s ease-in-out forwards",
        "fade-in-out": "fadeinout 4s ease-in-out 0.25s forwards",
      },
    },
  },
  plugins: [],
};
