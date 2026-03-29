import React from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Cloud, Sparkles } from 'lucide-react';
import ShinyText from './ShinyText';
import { Reveal } from './Reveal';

export const CTA = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden bg-indigo-600" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}>
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 animate-gradient opacity-90" />
      
      {/* Animated Background Waves */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{ 
            x: [-200, 0, -200],
            y: [0, 40, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-[250%] h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent blur-3xl will-change-transform"
          style={{ translateZ: 0 }}
        />
      </div>

      {/* Floating Decorative Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => {
          const Icon = [Heart, Star, Cloud, Sparkles][i % 4];
          return (
            <motion.div
              key={i}
              className="absolute text-white/20 will-change-transform"
              style={{
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                translateZ: 0
              }}
              animate={{
                y: [0, -60, 0],
                x: [0, 30, 0],
                rotate: [0, 360],
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 6 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            >
              <Icon size={24 + Math.random() * 32} fill={i % 2 === 0 ? "currentColor" : "none"} />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <Reveal scale={0.9} width="100%">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-10 tracking-tight leading-[1.1]">
            <ShinyText text="Give Your Child the " speed={3} shineColor="rgba(255,255,255,0.8)" />
            <br className="hidden md:block" />
            <ShinyText text="Best Start" speed={3} shineColor="rgba(255,255,255,0.8)" />
          </h2>
        </Reveal>
        
        <Reveal y={20} delay={0.3} width="100%">
          <p className="text-lg sm:text-xl lg:text-2xl text-indigo-100 mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed font-medium opacity-90">
            <ShinyText text="Join our family today and watch your little one bloom in a world of magic, learning, and boundless imagination." speed={4} shineColor="rgba(255,255,255,0.6)" />
          </p>
        </Reveal>

        <Reveal y={20} delay={0.5} width="100%">
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Enroll your child now"
              animate={{ 
                boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.2)", "0 0 0px rgba(255,255,255,0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-full sm:w-auto px-12 py-5 bg-white text-indigo-600 rounded-full font-bold text-base sm:text-lg shadow-2xl transition-all relative group overflow-hidden min-h-[44px] will-change-transform"
              style={{ translateZ: 0 }}
            >
              <span className="relative z-10">Enroll Now</span>
              <div className="absolute inset-0 bg-indigo-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Contact Zahra Daycare"
              className="w-full sm:w-auto px-12 py-5 bg-transparent border-2 border-white/50 text-white rounded-full font-bold text-base sm:text-lg shadow-xl transition-all backdrop-blur-sm min-h-[44px] will-change-transform"
              style={{ translateZ: 0 }}
            >
              Contact Us
            </motion.button>
          </div>
        </Reveal>
      </div>
      
      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] fill-white/10">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};
