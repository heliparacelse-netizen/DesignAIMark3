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
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 6s ease infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glow: {
          from: { boxShadow: '0 0 10px #c9a84c30' },
          to: { boxShadow: '0 0 25px #c9a84c60, 0 0 50px #c9a84c20' },
        },
      },
    },
  },
  plugins: [],
}
