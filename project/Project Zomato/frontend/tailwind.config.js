export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ff4d4d',
          DEFAULT: '#e03939',
          dark: '#c02d2d',
        },
        secondary: '#09c1d7',
        accent: '#ff9f43',
        dark: '#1c1c1c',
        neutral: '#f8f8f8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
