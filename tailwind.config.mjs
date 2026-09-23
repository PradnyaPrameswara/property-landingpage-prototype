/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray300: 'var(--gray-300)',
        gray200: 'var(--gray-200)',
        gray100: 'var(--gray-100)',
        gray50: 'var(--gray-50)',
        ink: 'var(--black)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        body: ['var(--font-body)'],
        display: ['var(--font-display)'],
      },
    },
  },
  plugins: [],
};
