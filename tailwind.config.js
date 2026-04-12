/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [" emerald", "dark"], // Hoặc để true để lấy tất cả
    darkTheme: "dark", 
    base: true, 
    utils: true, 
    prefix: "", 
    logs: true, 
    themeRoot: ":root",
  },
}