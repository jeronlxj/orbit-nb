/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    display: ['responsive', 'group-hover', 'group-focus'],
   },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    extend: {
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: (theme) => ({
        capt: "url('./capt-night-image.jpg')",
        utown: "url('./utown-night-image.jpg')",
        erc: "url('./erc-wide.jpg')",
      }),
    },
  },
  plugins: [
    
  ],
}

