/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/client/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/client/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/client/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#331D2C',
        secondary: '#3F2E3E',
        accent: '#A78295',
        neutral: '#EFE1D1',
      },
    },
  },
  plugins: [],
}
