import type { Config } from 'tailwindcss';

const tailwindConfig = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  prefix: '',
  theme: {
    fontFamily: {
      sans: ['var(--font-sans)'],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--dark)',
        },
        white: 'var(--white)',
        dark: 'var(--dark)',
        gray: 'var(--gray)',
        purple: 'var(--purple)',
        blue: 'var(--blue)',
        background: 'var(--background)',
      },
      fontSize: {
        title: ['20px', '30px'],
        subtitle: ['14px', '21px'],
        description: ['16px', '24px'],
      },
    },
  },
} satisfies Config;

export default tailwindConfig;
