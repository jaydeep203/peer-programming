/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#121212',
          hover: '#121212CC',
        },
        primary: {
          DEFAULT: '#FF9119',
          hover: '#FF9119B3', // For 80% opacity on hover (FF9119/80)
        },
        // Secondary color for lighter, alternative buttons
        secondary: {
          DEFAULT: '#FFFFFF',
          text: '#1E1E1E',  // Dark text for secondary button text
          hover: '#F3F4F6', // Light gray for hover state on secondary button
        },
        
        // Text and background
        'dark-gray': '#1E1E1E',   // Dark background color
        'light-gray': '#E0E0E0',   // Light gray for general text on dark backgrounds
        'gray-400': '#A0A0A0',  
        'coral-red': '#FF6666',
        'green': '#2CBF6E'
      },
    },
  },
  plugins: [],
}

