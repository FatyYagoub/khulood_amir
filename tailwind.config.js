const defaultTheme = require("tailwindcss/defaultTheme");

// THIS OBJECT SHOULD BE SIMILAR TO ./helpers/theme.js
const themeConstants = {
  paper: "#FFFFFF",
  primary: "#A93396",
  darkPurple: "#6B185E",
  secondary: "#0F114B",
  overlay: "#F9EFF7",
  grey: "#9F9F9F",
  darkGrey: "#636363",
  blue: "#0000FF",
};

module.exports = {
  mode: "jit",
  content: [
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
    "./layouts/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        paper: themeConstants.paper,
        primary: themeConstants.primary,
        secondary: themeConstants.secondary,
        darkPurple: themeConstants.darkPurple,
        overlay: themeConstants.overlay,
        grey: themeConstants.grey,
        darkGrey: themeConstants.darkGrey,
        //...defaultTheme.colors,
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Cairo: ["Cairo", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
      },
    },

    // We over ride the whole screens with breakpoints for width. The 'ha' breakpoint will help us in blocking hover animations on devices not supporting hover.
    screens: {
      ...defaultTheme.screens,
      ...defaultTheme.breakpoints,
      ha: { raw: "(hover: hover)" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
