/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        background: "var(--color-bg)",
        foreground: "var(--color-foreground)"
      },
      fontFamily: {
        base: "var(--font-family-base)"
      }
    }
  },
  plugins: []
}
