/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d1f300',
        secondary: '#a8e765',
        accent: '#4892db',
        success: '#137a3c',
        background: '#fff8e8',
        text: '#1a1a1a',
        lime: '#d1f300',
        green: '#a8e765',
        blue: '#4892db',
        darkgreen: '#137a3c',
        cream: '#fff8e8',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Montserrat', 'Nunito Sans', 'Outfit', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Montserrat', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'Outfit', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
        body: ['Nunito Sans', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'system-ui', 'sans-serif'],
        mono: ['Outfit', 'monospace'],
      },
    },
  },
  plugins: [],
}
