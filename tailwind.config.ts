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
    plugin(function ({ addComponents, addUtilities, theme }) {
      // Premium button components
      addComponents({
        '.btn-premium': {
          '@apply': 'px-8 py-3 rounded-premium font-bold text-sm uppercase tracking-wide transition-all duration-300 ease-out',
        },
        '.btn-primary': {
          '@apply': 'btn-premium bg-indigo-600 text-white shadow-glow hover:shadow-glow-hover hover:scale-105 active:scale-95',
        },
        '.btn-secondary': {
          '@apply': 'btn-premium bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 active:scale-95',
        },
        '.card-premium': {
          '@apply': 'rounded-premium border border-indigo-100 bg-white shadow-premium hover:shadow-premium-lg transition-all duration-300',
        },
        '.card-premium-hover': {
          '@apply': 'card-premium hover:-translate-y-2',
        },
        '.input-premium': {
          '@apply': 'px-6 py-3 rounded-premium border-2 border-indigo-100 bg-white/50 text-indigo-950 placeholder-indigo-300 focus:outline-none focus:border-indigo-600 focus:bg-white focus:shadow-glow transition-all duration-300',
        },
        '.glass': {
          '@apply': 'bg-white/40 backdrop-blur-md border border-white/20 shadow-premium',
        },
        '.glass-dark': {
          '@apply': 'bg-indigo-950/20 backdrop-blur-lg border border-white/10',
        },
        '.glass-premium': {
          '@apply': 'bg-white/60 backdrop-blur-xl border border-white/40 shadow-premium',
        },
      });

      // Premium utilities
      addUtilities({
        '.text-glow': {
          textShadow: '0 0 20px rgba(79, 70, 229, 0.3)',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.animate-gradient': {
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 8s ease infinite',
        },
        '.scrollbar-hide': {
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.section-premium': {
          '@apply': 'py-12 sm:py-16 lg:py-24',
        },
        '.container-premium': {
          '@apply': 'max-w-7xl mx-auto px-6',
        },
        '.scroll-reveal': {
          opacity: '0',
          transform: 'translateY(40px)',
        },
        '.fade-in-up': {
          animation: 'fadeInUp 0.8s ease-out forwards',
        },
        '.underline-animate': {
          position: 'relative',
          textDecoration: 'none',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-2px',
            left: '0',
            width: '0',
            height: '2px',
            background: 'currentColor',
            transition: 'width 0.3s ease',
          },
          '&:hover::after': {
            width: '100%',
          },
        },
        '.hover-lift': {
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
          },
        },
        '.hover-scale': {
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
        '.focus-ring': {
          '@apply': 'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300',
        },
        '.bg-noise': {
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        },
        '.vignette': {
          background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.03) 100%)',
        },
      });
    }),
  ],
} satisfies Config;
