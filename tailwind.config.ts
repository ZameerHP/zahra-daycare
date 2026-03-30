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
          paddingLeft: '2rem',
          paddingRight: '2rem',
          paddingTop: '0.75rem',
          paddingBottom: '0.75rem',
          borderRadius: '16px',
          fontWeight: '700',
          fontSize: '0.875rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          transitionProperty: 'all',
          transitionDuration: '300ms',
          transitionTimingFunction: 'ease-out',
        },
        '.btn-primary': {
          backgroundColor: '#4f46e9',
          color: '#ffffff',
          boxShadow: '0 0 30px rgba(79, 70, 229, 0.2)',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          paddingTop: '0.75rem',
          paddingBottom: '0.75rem',
          borderRadius: '16px',
          fontWeight: '700',
          fontSize: '0.875rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          transitionProperty: 'all',
          transitionDuration: '300ms',
          transitionTimingFunction: 'ease-out',
          '&:hover': {
            backgroundColor: '#4338ca',
            boxShadow: '0 0 40px rgba(79, 70, 229, 0.3)',
            transform: 'scale(1.05)',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        },
        '.btn-secondary': {
          backgroundColor: '#f3f4f6',
          color: '#4f46e9',
          border: '1px solid #c7d2fe',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          paddingTop: '0.75rem',
          paddingBottom: '0.75rem',
          borderRadius: '16px',
          fontWeight: '700',
          fontSize: '0.875rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          transitionProperty: 'all',
          transitionDuration: '300ms',
          transitionTimingFunction: 'ease-out',
          '&:hover': {
            backgroundColor: '#e0e7ff',
            borderColor: '#a5b4fc',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        },
        '.card-premium': {
          borderRadius: '16px',
          border: '1px solid #e0e7ff',
          backgroundColor: '#ffffff',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
          transitionProperty: 'all',
          transitionDuration: '300ms',
          '&:hover': {
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
          },
        },
        '.card-premium-hover': {
          borderRadius: '16px',
          border: '1px solid #e0e7ff',
          backgroundColor: '#ffffff',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
          transitionProperty: 'all',
          transitionDuration: '300ms',
          '&:hover': {
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-8px)',
          },
        },
        '.input-premium': {
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          paddingTop: '0.75rem',
          paddingBottom: '0.75rem',
          borderRadius: '16px',
          border: '2px solid #e0e7ff',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          color: '#1e1b4b',
          transitionProperty: 'all',
          transitionDuration: '300ms',
          '&:focus': {
            outline: 'none',
            borderColor: '#4f46e9',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 30px rgba(79, 70, 229, 0.2)',
          },
          '&::placeholder': {
            color: '#a5b4fc',
          },
        },
        '.glass': {
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        },
        '.glass-dark': {
          backgroundColor: 'rgba(15, 23, 42, 0.2)',
          backdropFilter: 'blur(32px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.glass-premium': {
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(44px)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
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
