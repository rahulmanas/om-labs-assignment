/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "entire-bg": "rgb(19, 26, 42)",
        "swap-box": "rgb(13, 17, 28)",
        "swap-input-box": "rgb(19, 26, 42)",
        "swap-token": "rgb(41, 50, 73)",
        boundary: "rgba(152, 161, 192, 0.24)",
      },
      borderWidth: {
        1: "1px",
      },
      width: {
        125: "31.25rem",
      },
    },
  },
  variants: {},
  plugins: ["@tailwindcss/forms"],
};
