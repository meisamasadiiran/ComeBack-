/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-bg': '#F7F5F0',
        'warm-card': '#FFFFFF',
        'warm-subtle': '#EFECE5',
        'warm-border': '#E4DFD5',
        'charcoal': '#171717',
        'charcoal-light': '#262626',
        'charcoal-muted': '#6B6760',
        'comeback-orange': '#E45A2A',
        'comeback-orange-light': '#FDF1EC',
        'recovery-green': '#3E6B57',
        'recovery-green-light': '#EFF6F2',
        'warning-gold': '#C98A28',
        'warning-gold-light': '#FAF5EB',
        'danger-red': '#B83A32',
        'danger-red-light': '#FDF2F1',
        'na-blue': '#3568A8',
        'na-blue-light': '#EEF4FA',
      },
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(23, 23, 23, 0.05), 0 1px 4px -1px rgba(23, 23, 23, 0.03)',
        'card': '0 4px 14px -3px rgba(23, 23, 23, 0.07)',
      }
    },
  },
  plugins: [],
}
