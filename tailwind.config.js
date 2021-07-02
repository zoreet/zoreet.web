// Example `tailwind.config.js` file
// const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    colors: {
      // generated via https://javisperez.github.io/tailwindcolorshades/?white=ffffff&black=000000&bermuda=82e5cc&dark=312e53&danger=f27778&warning=fec660&lilac=a57ed5
      dark: {
        50: "#f5f5f6",
        100: "#eaeaee",
        200: "#cccbd4",
        300: "#adabba",
        400: "#6f6d87",
        500: "#312e53",
        600: "#2c294b",
        700: "#25233e",
        800: "#1d1c32",
        900: "#181729",
      },
      lilac: {
        50: "#fbf9fd",
        100: "#f6f2fb",
        200: "#e9dff5",
        300: "#dbcbee",
        400: "#c0a5e2",
        500: "#a57ed5",
        600: "#9571c0",
        700: "#7c5fa0",
        800: "#634c80",
        900: "#513e68",
      },
      bermuda: {
        50: "#f9fefc",
        100: "#f3fcfa",
        200: "#e0f9f2",
        300: "#cdf5eb",
        400: "#a8eddb",
        500: "#82e5cc",
        600: "#75ceb8",
        700: "#62ac99",
        800: "#4e897a",
        900: "#407064",
      },
      warning: {
        50: "#fffcf7",
        100: "#fff9ef",
        200: "#fff1d7",
        300: "#ffe8bf",
        400: "#fed790",
        500: "#fec660",
        600: "#e5b256",
        700: "#bf9548",
        800: "#98773a",
        900: "#7c612f",
      },
      danger: {
        50: "#fef8f8",
        100: "#fef1f2",
        200: "#fcdddd",
        300: "#fac9c9",
        400: "#f6a0a1",
        500: "#f27778",
        600: "#da6b6c",
        700: "#b6595a",
        800: "#914748",
        900: "#773a3b",
      },
      white: {
        500: "#ffffff",
      },
      black: {
        500: "#000000",
      },
    },
    fontFamily: {
      sans: [
        "BlinkMacSystemFont",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      serif: ["Merriweather", "serif"],
    },
    // extend: {
    //   spacing: {
    //     128: "32rem",
    //     144: "36rem",
    //   },
    //   borderRadius: {
    //     "4xl": "2rem",
    //   },
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
