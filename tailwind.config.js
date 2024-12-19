/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      colors: {
        "app-red-primary": "#D90D1E",
        "app-red-tint": "#F20F38",
        "app-red-shade": "#BF0426",
        "app-dark-primary": "#0D0D0D",
        "app-gray-primary": "#595959",
        "app-blue-primary": "#025E73",
        "app-blue-secondary": "#023E73",
        "app-blue-shade": "#011F26",
      },
      backgroundColor: {
        "app-red-primary": "#D90D1E",
        "app-red-tint": "#F20F38",
        "app-red-shade": "#BF0426",
        "app-dark-primary": "#0D0D0D",
        "app-gray-primary": "#595959",
        "app-blue-primary": "#025E73",
        "app-blue-secondary": "#023E73",
        "app-blue-shade": "#011F26",
        "app-black-transparent": "rgba(0,0,0,0.6)",
      },
      borderColor: {
        "app-red-primary": "#D90D1E",
        "app-red-tint": "#F20F38",
        "app-red-shade": "#BF0426",
        "app-dark-primary": "#0D0D0D",
        "app-gray-primary": "#595959",
        "app-blue-primary": "#025E73",
        "app-blue-secondary": "#023E73",
        "app-blue-shade": "#011F26",
      },
    },
  },
  plugins: [],
};
