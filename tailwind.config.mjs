/** @type {import('tailwindcss').Config} */
import tokens from './src/styles/tokens.tailwind.js';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: { extend: tokens },
  plugins: [],
};
