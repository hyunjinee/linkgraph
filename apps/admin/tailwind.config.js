/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'antd-form': '#d9d9d9',
        brand: '#63489a',
        turquoise: '#1abc9c',
        greensea: '#16a085',
        emerald: '#2ecc71',
        nephritis: '#27ae60',
        peterriver: '#3498db',
        belizehole: '#2980b9',
        amethyst: '#9b59b6',
        wisteria: '#8e44ad',
        wetasphalt: '#34495e',
        midnightblue: '#2c3e50',
        sunflower: '#f1c40f',
        orange: '#f39c12',
        carrot: '#e67e22',
        pumpkin: '#d35400',
        alizarin: '#e74c3c',
        pomegranate: '#c0392b',
        clouds: '#ecf0f1',
        silver: '#bdc3c7',
        concrete: '#95a5a6',
        asbestos: '#7f8c8d',
      },
    },
    // spacing: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
