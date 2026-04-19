/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        sans: ['Sora', 'sans-serif'],
      },
      colors: {
        danger: {
          DEFAULT: '#E24B4A',
          light: '#FCEBEB',
          dark: '#A32D2D',
        },
        warn: {
          DEFAULT: '#EF9F27',
          light: '#FAEEDA',
          dark: '#854F0B',
        },
        safe: {
          DEFAULT: '#1D9E75',
          light: '#E1F5EE',
          dark: '#085041',
        }
      }
    },
  },
  plugins: [],
}
