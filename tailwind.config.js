/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mplus: ['"MPLUSRounded1c"', "sans-serif"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundImage: {
        "green-button": "linear-gradient(to bottom, #33DE44, #6AFF52)",
        "red-button": "linear-gradient(to bottom, #DE3333, #FF6129)",
      },
      colors: {
        "custom-lightBlue": "#16BDFF",
        "custom-blue": "#6A6AF1",
        "custom-purple": "#C065FE",
        "custom-orange": "#FF9818",
        "custom-yellow": "#FFDE6B",
        "custom-lightGreen": "#A9DC35",
        "custom-green": "#229654",
        "custom-gray": "#B0BDD4",
        "custom-pink": "#FE8EEB",
        "progressCenter-icon": "#9E009E",
        "customization-icon": "#4C3BAC",
        "green-button": "linear-gradient(to bottom, #33DE44, #6AFF52)",
      },
    },
    screens: {
      "extra-sm": "279px",
      md: "768px",
      lg: "1024px",
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
