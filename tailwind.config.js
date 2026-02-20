/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          yellow: '#FFF44F',
          charcoal: '#2e2e2e',
        },
        // New color scheme
        black: {
          50: '#f9f9f9',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#c0c0c0',
          400: '#808080',
          500: '#606060',
          600: '#404040',
          700: '#202020',
          800: '#101010',
          900: '#000000',
        },
        gold: {
          50: '#fffef4',
          100: '#fffce8',
          200: '#FFF44F',
          300: '#FFF44F', // Lemon yellow
          400: '#FFF44F',
          500: '#FFF44F',
          600: '#FFF44F',
          700: '#e6da00',
          800: '#b3a900',
          900: '#807800',
        },
        white: '#FFFFFF',
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        // Legacy colors for backward compatibility
        cream: {
          50: '#fdfcfa',
          100: '#faf8f5',
          200: '#f5f1ea',
          300: '#f0eadf',
          400: '#ebe3d4',
          500: '#e6dcc9',
          600: '#d4c5ac',
          700: '#c2ae8f',
          800: '#b09772',
          900: '#9e8055',
        },
        dark: {
          50: '#f5f5f5',
          100: '#e0e0e0',
          200: '#bdbdbd',
          300: '#9e9e9e',
          400: '#757575',
          500: '#616161',
          600: '#424242',
          700: '#303030',
          800: '#1a1a1a',
          900: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['var(--font-bebas-neue)', 'system-ui', 'sans-serif'],
        bebas: ['var(--font-bebas-neue)', 'sans-serif'],
        rethink: ['var(--font-rethink-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
