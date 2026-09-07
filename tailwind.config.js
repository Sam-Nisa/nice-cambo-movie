/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#0e0d0b",
          surface: "#1a1815",
          "surface-raised": "#221f1a",
          hairline: "#35312a",
          ink: "#f2eee4",
          "ink-muted": "#948d80",
          gold: "#c9a227",
          "gold-hover": "#ddb32d",
          velvet: "#7a2230",
          "velvet-hover": "#942a3b",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["'IBM Plex Sans'", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "fade-in": "fadeIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
