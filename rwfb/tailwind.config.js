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
      backgroundImage: (theme) => ({
        capt: "url('./capt-night-image.jpg')",
        utown: "url('./utown-night-image.jpg')",
      }),
    },
  },
  plugins: [
    
  ],
}

