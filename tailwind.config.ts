import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        takify: {
          deep_blue: '#0052cc',
          sky_blue: '#00a2ff',
          dark_grey: '#333333',
          light_grey: '#e5e5e5',
          light_silver: '#ecf0f1',
          positive: '#4CAF50',
          gold: '#ffd700',
        },
      },
    },
  },
  plugins: [],
}
export default config
