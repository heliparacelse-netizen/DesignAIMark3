/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#111118',
        'bg-card': '#16161f',
        'border-dark': '#2a2a3a',
        'text-primary': '#f5f5f0',
        'text-secondary': '#9999aa',
        'gold': '#c9a84c',
        'gold-light': '#f0c96e',
        'purple-accent': '#6c47ff',
      },
    },
  },
  plugins: [],
}
