import type { Config } from "tailwindcss";
const svgToDataUri = require("mini-svg-data-uri");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        jaharta: {
          deep: "#06060c",
          dark: "#0a0a14",
          surface: "#0f0f1a",
          card: "rgba(18, 18, 32, 0.5)",
        },
        cyan: {
          DEFAULT: "#00f0ff",
          dim: "#00a0aa",
          glow: "rgba(0, 240, 255, 0.38)",
        },
        violet: {
          DEFAULT: "#b44aff",
          dim: "#7b2fbd",
          glow: "rgba(180, 74, 255, 0.25)",
        },
        magenta: {
          DEFAULT: "#ff2a8a",
          glow: "rgba(255, 42, 138, 0.19)",
        },
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        heading: ["Rajdhani", "sans-serif"],
        body: ["Exo 2", "sans-serif"],
      },
      animation: {
        "hero-drift": "heroDrift 30s ease-in-out infinite alternate",
        "scroll-pulse": "scrollPulse 2s ease-in-out infinite",
        "glitch-top": "glitchTop 4s infinite",
        "glitch-bottom": "glitchBottom 4s infinite",
        "fade-in-up": "fadeInUp 0.8s ease forwards",
        "fade-in": "fadeIn 1s ease forwards",
        shimmer: "shimmer 2s linear infinite",
        "pt-pulse": "ptPulse 1.2s ease-in-out infinite",
        "pt-slide": "ptSlide 0.8s ease-in-out infinite",
        "rank-pulse": "rankPulse 2.5s infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        heroDrift: {
          "0%": { transform: "scale(1.1) translate(0, 0)" },
          "50%": { transform: "scale(1.15) translate(-1%, 0.5%)" },
          "100%": { transform: "scale(1.1) translate(0.5%, -0.5%)" },
        },
        scrollPulse: {
          "0%, 100%": { opacity: "0.3", transform: "scaleY(0.6)" },
          "50%": { opacity: "1", transform: "scaleY(1)" },
        },
        glitchTop: {
          "0%, 90%, 100%": { opacity: "0", transform: "translate(0)" },
          "92%": { opacity: "0.8", transform: "translate(-3px, -2px)" },
          "94%": { opacity: "0" },
          "96%": { opacity: "0.6", transform: "translate(3px, 1px)" },
          "98%": { opacity: "0" },
        },
        glitchBottom: {
          "0%, 90%, 100%": { opacity: "0", transform: "translate(0)" },
          "91%": { opacity: "0.6", transform: "translate(3px, 2px)" },
          "93%": { opacity: "0" },
          "95%": { opacity: "0.8", transform: "translate(-2px, -1px)" },
          "97%": { opacity: "0" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        ptPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        ptSlide: {
          "0%": { left: "-40%" },
          "100%": { left: "100%" },
        },
        rankPulse: {
          "0%, 100%": { textShadow: "0 0 12px currentColor" },
          "50%": {
            textShadow: "0 0 28px currentColor, 0 0 50px currentColor",
          },
        },
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 8px rgba(0, 240, 255, 0.38)",
        "glow-md":
          "0 0 20px rgba(0, 240, 255, 0.38), 0 0 40px rgba(0, 240, 255, 0.12)",
        "glow-lg":
          "0 0 30px rgba(0, 240, 255, 0.38), 0 0 80px rgba(0, 240, 255, 0.09), 0 0 120px rgba(0, 240, 255, 0.05)",
        "glow-violet":
          "0 0 20px rgba(180, 74, 255, 0.25), 0 0 50px rgba(180, 74, 255, 0.09)",
      },
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-dot-thick": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme("backgroundColor")),
          type: "color",
        }
      );
    },
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({ ":root": newVars });
}

export default config;
