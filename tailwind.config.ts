import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:       'var(--bg)',
        'bg-2':   'var(--bg-2)',
        'bg-3':   'var(--bg-3)',
        surface:  'var(--surface)',
        's2':     'var(--surface-2)',
        border:   'var(--border)',
        'b2':     'var(--border-2)',
        text: {
          DEFAULT: 'var(--text)',
          muted:   'var(--text-2)',
          dim:     'var(--text-3)',
        },
        accent:   'var(--accent)',
        'accent2':'var(--accent-2)',
        amber:    'var(--amber)',
        dl:  'var(--dl)',
        gt:  'var(--gt)',
        rl:  'var(--rl)',
        pr:  'var(--pr)',
        st:  'var(--st)',
        ps:  'var(--ps)',
      },
      fontFamily: {
        mono: ['ui-monospace', 'SF Mono', 'Cascadia Code', 'Fira Code', 'monospace'],
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
    },
  },
  plugins: [],
} satisfies Config
