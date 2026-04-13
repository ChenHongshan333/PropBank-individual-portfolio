/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pb-navy':   '#072ac8',
        'pb-blue':   '#1e96fc',
        'pb-sky':    '#a2d6f9',
        'pb-yellow': '#fcf300',
        'pb-amber':  '#ffc600',
        'pb-pale':   '#E5F4FE',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono:  ['"VT323"', 'monospace'],
      },
    },
  },
  plugins: [],
}
