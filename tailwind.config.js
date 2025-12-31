/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        comfortaa: ['Comfortaa', 'sans-serif'],
        varela: ['Varela Round', 'sans-serif'],
        fredoka: ['Fredoka', 'sans-serif'],
        baloo: ['Baloo 2', 'sans-serif'],
        righteous: ['Righteous', 'sans-serif'],
        bubblegum: ['Bubblegum Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}