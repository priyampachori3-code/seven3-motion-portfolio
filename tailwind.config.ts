import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        frame: '#140E0B',
        cream: {
          DEFAULT: '#F0E4D6',
          panel: '#F0E4D6',
          light: '#F8F1E9',
          border: 'rgba(27, 18, 13, 0.08)',
        },
        dark: {
          panel: '#1A100C',
          panelEnd: '#2A1A14',
          navy: '#0E1726',
        },
        ink: {
          DEFAULT: '#1B120D',
          muted: 'rgba(27, 18, 13, 0.65)',
          faint: 'rgba(27, 18, 13, 0.40)',
        },
        accent: {
          DEFAULT: '#F26B21',
          hover: '#FF7F3A',
          faint: 'rgba(242, 107, 33, 0.12)',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        sans: ['var(--font-body)', 'sans-serif'],
      },
      borderRadius: {
        panel: '28px',
        card: '22px',
        pill: '9999px',
      },
      boxShadow: {
        panel: '0 30px 60px -12px rgba(20, 14, 11, 0.35)',
        card: '0 10px 30px -5px rgba(27, 18, 13, 0.06)',
        cardHover: '0 20px 40px -10px rgba(27, 18, 13, 0.12)',
        glow: '0 0 25px rgba(242, 107, 33, 0.4)',
      },
      letterSpacing: {
        micro: '0.2em',
        tightest: '-0.04em',
      },
      lineHeight: {
        hero: '0.95',
      },
    },
  },
  plugins: [],
};

export default config;
