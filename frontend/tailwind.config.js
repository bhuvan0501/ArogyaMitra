/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefaf4",
          100: "#d8f3e5",
          500: "#22a06b",
          600: "#178457",
          700: "#126b49",
          900: "#063d2b"
        },
        clinic: {
          ink: "#10202f",
          mist: "#f6fbfc",
          aqua: "#38bdf8",
          mint: "#34d399"
        }
      },
      boxShadow: {
        glass: "0 18px 55px rgba(15, 23, 42, 0.10)"
      },
      animation: {
        "fade-in": "fadeIn 240ms ease-out",
        "slide-up": "slideUp 260ms ease-out",
        shimmer: "shimmer 1.8s ease-in-out infinite"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      }
    }
  },
  plugins: []
};
