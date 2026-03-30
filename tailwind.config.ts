import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pastel-blue': '#e0f2fe',
        'lavender': '#f3e8ff',
        'peach': '#ffedd5',
        'mint': '#f0fdf4',
        'paper': '#fdfdfc',
        'ink': '#1a1a1a',
      },
      fontFamily: {
        sans: '"Poppins", "Inter", ui-sans-serif, system-ui, sans-serif',
        display: '"Space Grotesk", sans-serif',
        serif: '"Playfair Display", serif',
      },
      borderRadius: {
        'premium': '16px',
        'premium-lg': '24px',
        'premium-xl': '32px',
      },
      boxShadow: {
        'premium': '0 10px 30px rgba(0, 0, 0, 0.08)',
        'premium-lg': '0 20px 50px rgba(0, 0, 0, 0.1)',
        'premium-hover': '0 15px 40px rgba(79, 70, 229, 0.15)',
        'glow': '0 0 30px rgba(79, 70, 229, 0.2)',
        'glow-hover': '0 0 40px rgba(79, 70, 229, 0.3)',
      },
      animation: {
        'soft-float': 'soft-float 6s ease-in-out infinite',
        'glow': 'glow-pulse 2s ease-in-out infinite',
        'gradient': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        'soft-float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79, 70, 229, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(79, 70, 229, 0.4)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      // Additional utilities can be added here if needed
      addUtilities({});
    }),
  ],
} satisfies Config;
