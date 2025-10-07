/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "#7c3aed",
        header: "rgba(255,255,255,0.75)",
        muted: "rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
