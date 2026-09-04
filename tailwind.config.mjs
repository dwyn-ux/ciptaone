/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        paper: '#F1F1EC',
        muted: '#92928B',
        line: '#363636',
        accent: '#B8FF3D',
        red: '#FF5B47'
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'monospace']
      },
      letterSpacing: {
        tightest: '-0.105em',
        tighter: '-0.075em',
        tight: '-0.065em'
      },
      maxWidth: {
        shell: '1480px'
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(.22, 1, .36, 1)'
      }
    }
  },
  plugins: []
};
