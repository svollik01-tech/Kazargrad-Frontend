/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Warm countryside palette — inspired by wooden houses, pine forest, gazebos.
        wood: {
          dark: '#2A1A14', // Dark wood
          pine: '#8A542E', // Pine wood
        },
        pine: '#3F5A3A', // Pine green
        sand: '#F2E6D3', // Warm sand
        milk: '#FAF7EF', // Milk white
        sun: '#F2B705', // Sunny yellow
        brick: '#C9362B', // Warm red accent
        sky: '#7FB7D8', // Sky blue
        graphite: '#252525', // Graphite text
      },
      fontFamily: {
        // Headings: elegant serif; body: modern sans — both with Cyrillic support.
        heading: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(42, 26, 20, 0.18)',
        card: '0 8px 24px -10px rgba(42, 26, 20, 0.22)',
        lift: '0 22px 48px -18px rgba(42, 26, 20, 0.32)',
      },
      borderRadius: {
        xl2: '1.5rem',
        '4xl': '2rem',
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
