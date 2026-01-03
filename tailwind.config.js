/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-bg': '#1a1625',
        'game-panel': '#251e35',
        'game-accent': '#6366f1',
        'game-gold': '#fbbf24',
        'xp-green': '#10b981',
        'quest-green': '#22c55e',
        'quest-yellow': '#eab308',
        'quest-red': '#ef4444',
      },
    },
  },
  plugins: [],
}
