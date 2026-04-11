import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from palette
        brand: {
          cream: '#F2F4EB',
          'pink-light': '#EDA1A7',
          red: '#EC3237',
          green: '#A4CF4C',
          charcoal: '#363435',
        },
        // Extended red palette (from logo)
        wave: {
          50: '#fef2f2',
          100: '#fde6e7',
          200: '#f9bfc1',
          300: '#EDA1A7',
          400: '#e5686e',
          500: '#EC3237',
          600: '#d42a2f',
          700: '#b12428',
          800: '#921f22',
          900: '#781c1f',
        },
        // Extended green palette (from logo)
        leaf: {
          50: '#f7fce9',
          100: '#eef9d0',
          200: '#ddf3a6',
          300: '#c4e972',
          400: '#A4CF4C',
          500: '#8ab83a',
          600: '#6b922b',
          700: '#517025',
          800: '#435923',
          900: '#3a4c21',
        },
        // Neutral charcoal scale
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#363435',
          950: '#1a1a1a',
        },
        // Cream/background scale
        cream: {
          50: '#FAFBF7',
          100: '#F2F4EB',
          200: '#E8EBE0',
          300: '#D9DED0',
          400: '#C5CCBA',
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(135deg, #EC3237 0%, #A4CF4C 100%)',
        'wave-gradient': 'linear-gradient(180deg, rgba(236,50,55,0.05) 0%, rgba(164,207,76,0.05) 100%)',
      },
      animation: {
        'wave-slow': 'wave 8s ease-in-out infinite',
        'wave-slower': 'wave 12s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'pulse-subtle': 'pulseSoft 4s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-10px) translateX(5px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'glow-red': '0 0 40px rgba(236, 50, 55, 0.2)',
        'glow-green': '0 0 40px rgba(164, 207, 76, 0.2)',
        'card': '0 8px 32px rgba(54, 52, 53, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
