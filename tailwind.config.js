/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html"],
  theme: {
    extend: {
      fontFamily: {
        SpaceMono: ["Space Mono", "monospace"],
      },
      colors: {
        primary_strong_cyan: "hsl(172, 67%, 45%)",
        neutral_very_dark_cyan: "hsl(183, 100%, 15%)",
        neutral_dark_grayish_cyan: "hsl(186, 14%, 43%)",
        neutral_grayish_cyan: "hsl(184, 14%, 56%)",
        neutral_light_grayish_cyan: "hsl(185, 41%, 84%)",
        neutral_very_light_grayish_cyan: "hsl(189, 41%, 97%)",
        neutral_white: "hsl(0, 0%, 100%)",
      },
    },
  },
  plugins: [],
};
