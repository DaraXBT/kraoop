/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF5F7",
          100: "#FFE3E9",
          200: "#FFC7D4",
          300: "#FFA3B7",
          400: "#F5A3B7", // Main brand color
          500: "#E392A6",
          600: "#D07B8F",
          700: "#B76E79",
          800: "#9E5C67",
          900: "#7D4A53",
        },
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        accent: {
          pink: "#F5A3B7",
          purple: "#B0A6BD",
          green: "#4A9B52",
          blue: "#4A90E2",
        },
        glass: {
          white: "rgba(255, 255, 255, 0.7)",
          "white-strong": "rgba(255, 255, 255, 0.85)",
          "white-subtle": "rgba(255, 255, 255, 0.5)",
          dark: "rgba(17, 24, 39, 0.7)",
          pink: "rgba(245, 163, 183, 0.2)",
        },
      },
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "Lexend",
          "Plus Jakarta Sans",
          "Lexend",
          "Kantumruy Pro",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        heading: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Lexend", "Plus Jakarta Sans", "sans-serif"],
        kantumruy: ["Kantumruy Pro", "sans-serif"],
      },
      fontSize: {
        xs: ["0.6875rem", {lineHeight: "1rem"}], // 11px - Smaller
        sm: ["0.8125rem", {lineHeight: "1.125rem"}], // 13px - Reduced
        base: ["0.9375rem", {lineHeight: "1.375rem"}], // 15px - Slightly smaller
        lg: ["1.0625rem", {lineHeight: "1.5rem"}], // 17px - Reduced
        xl: ["1.125rem", {lineHeight: "1.625rem"}], // 18px - Smaller
        "2xl": ["1.375rem", {lineHeight: "1.875rem"}], // 22px - Reduced
        "3xl": ["1.625rem", {lineHeight: "2rem"}], // 26px - Smaller
        "4xl": ["1.875rem", {lineHeight: "2.25rem"}], // 30px - Reduced
        "5xl": ["2.25rem", {lineHeight: "2.5rem"}], // 36px - Smaller
        "6xl": ["2.75rem", {lineHeight: "1"}], // 44px - Reduced
      },
      spacing: {
        18: "4.5rem",
        72: "18rem", // Reduced from implicit
        80: "20rem", // Reduced
        88: "22rem",
        96: "24rem", // Reduced
        128: "32rem",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        // All shadow values removed
      },
      backdropBlur: {
        xs: "2px",
        sm: "8px",
        DEFAULT: "20px",
        md: "20px",
        lg: "40px",
        xl: "60px",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        "glass-fade": "glassFade 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": {opacity: "0"},
          "100%": {opacity: "1"},
        },
        slideUp: {
          "0%": {transform: "translateY(10px)", opacity: "0"},
          "100%": {transform: "translateY(0)", opacity: "1"},
        },
        slideDown: {
          "0%": {transform: "translateY(-10px)", opacity: "0"},
          "100%": {transform: "translateY(0)", opacity: "1"},
        },
        scaleIn: {
          "0%": {transform: "scale(0.95)", opacity: "0"},
          "100%": {transform: "scale(1)", opacity: "1"},
        },
        float: {
          "0%, 100%": {transform: "translateY(0px)"},
          "50%": {transform: "translateY(-10px)"},
        },
        shimmer: {
          "0%": {backgroundPosition: "-1000px 0"},
          "100%": {backgroundPosition: "1000px 0"},
        },
        glassFade: {
          "0%": {opacity: "0", backdropFilter: "blur(0px)"},
          "100%": {opacity: "1", backdropFilter: "blur(20px)"},
        },
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      transitionTimingFunction: {
        "ios-ease": "cubic-bezier(0.4, 0, 0.2, 1)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        elastic: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  plugins: [],
};
