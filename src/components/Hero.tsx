import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Cloud, Sun, Trees as Tree, Sparkles, Flower } from 'lucide-react';
import ShinyText from './ShinyText';
import { Reveal } from './Reveal';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Simplified parallax transforms
  const skyY = useTransform(scrollY, [0, 1000], [0, 150]);
  const hillsY = useTransform(scrollY, [0, 1000], [0, 400]);
  const contentY = useTransform(scrollY, [0, 500], [0, 100]);

  const springConfig = { stiffness: 100, damping: 30 };
  const smoothSkyY = useSpring(skyY, springConfig);
  const smoothHillsY = useSpring(hillsY, springConfig);
  const smoothContentY = useSpring(contentY, springConfig);

  const headline = "A Safe and Happy Place for Your Child to Learn and Grow";

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-gradient-to-b from-blue-200 via-blue-100 to-[#86efac]/40 flex items-center justify-center scroll-mt-20 pt-20 sm:pt-16"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 100vh' }}
    >
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-noise" />
      
      {/* Vignette Effect */}
      <div className="absolute inset-0 z-[2] pointer-events-none vignette" />
      
      {/* Soft Glow behind Heading */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] sm:w-[600px] sm:h-[400px] bg-white/30 blur-[60px] sm:blur-[120px] rounded-full z-[3] pointer-events-none" />

      {/* Background Layer - Sky */}
      <motion.div 
        style={{ y: smoothSkyY, translateZ: 0 }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <div className="absolute top-16 sm:top-24 left-[5%] sm:left-[10%] text-yellow-400 opacity-60 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]" aria-hidden="true">
          <Sun size={60} sm:size={120} fill="currentColor" className="animate-pulse animate-soft-float" />
        </div>
        
        <div className="absolute top-32 sm:top-40 right-[10%] sm:right-[15%] text-indigo-200/30" aria-hidden="true">
          <Sparkles size={40} sm:size={80} />
        </div>
      </motion.div>

      {/* Clouds Layer - Static for performance */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        {/* Static cloud background */}
      </div>

      {/* Middle Layer - Hills / Greenery */}
      <motion.div 
        style={{ y: smoothHillsY, translateZ: 0 }}
        className="absolute bottom-0 left-0 w-full h-[40vh] sm:h-[60vh] z-10 will-change-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#4ade80] to-transparent opacity-30" />
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
        <svg viewBox="0 0 1440 400" className="absolute bottom-0 w-full h-full preserve-3d drop-shadow-[0_-5px_15px_rgba(0,0,0,0.05)]" preserveAspectRatio="none">
          <defs>
            <linearGradient id="hill1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
            <linearGradient id="hill2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          <path 
            fill="url(#hill1)" 
            fillOpacity="0.9" 
            d="M0,224L60,213.3C120,203,240,181,360,192C480,203,600,245,720,245.3C840,245,960,203,1080,181.3C1200,160,1320,160,1380,160L1440,160L1440,400L1380,400C1320,400,1200,400,1080,400C960,400,840,400,720,400C600,400,480,400,360,400C240,400,120,400,60,400L0,400Z"
          ></path>
          <path 
            fill="url(#hill2)" 
            fillOpacity="1" 
            d="M0,320L60,304C120,288,240,256,360,250.7C480,245,600,267,720,277.3C840,288,960,288,1080,272C1200,256,1320,224,1380,208L1440,192L1440,400L1380,400C1320,400,1200,400,1080,400C960,400,840,400,720,400C600,400,480,400,360,400C240,400,120,400,60,400L0,400Z"
          ></path>
        </svg>
        
        {/* Playground Elements Only - removed animated flowers/butterflies for performance */}
        <div className="absolute bottom-8 sm:bottom-16 left-[10%] sm:left-[15%] flex gap-8 sm:gap-16 items-end">
          <Tree className="text-green-800 opacity-70 drop-shadow-md animate-soft-float" size={60} sm:size={100} />
          <motion.div 
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="origin-top will-change-transform"
            style={{ translateZ: 0 }}
          >
            <div className="w-1 h-20 sm:w-1.5 sm:h-32 bg-gray-400 mx-auto rounded-full" />
            <div className="w-10 h-2 sm:w-16 sm:h-3 bg-orange-400 rounded-full shadow-lg" />
          </motion.div>
          <Tree className="text-green-700 opacity-60 hidden sm:block drop-shadow-md animate-soft-float" style={{ animationDelay: '1s' }} size={70} />
        </div>
      </motion.div>

      {/* Foreground Layer - Content */}
      <motion.div 
        style={{ y: smoothContentY, translateZ: 0 }}
        className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center will-change-transform drop-shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
      >
        <div className="max-w-6xl w-full">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-indigo-950 leading-[1.1] mb-6 sm:mb-10 tracking-tight">
            <ShinyText text={headline} speed={3} shineColor="rgba(255,255,255,0.8)" />
          </h1>
          
          <Reveal delay={1.8} y={20} width="100%">
            <p className="text-sm sm:text-lg lg:text-xl text-indigo-900/80 mb-8 sm:mb-14 font-medium max-w-3xl mx-auto leading-relaxed tracking-wide">
              <ShinyText 
                text="Where every child's journey is filled with wonder, magic, and boundless joy." 
                speed={4} 
                shineColor="rgba(255,255,255,0.6)" 
              />
            </p>
          </Reveal>

          <Reveal delay={2.2} scale={0.9} y={20} width="100%">
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 w-full sm:w-auto px-4 sm:px-0">
              <motion.button
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Enroll your child at Zahra Daycare"
                className="btn-primary shadow-glow hover:shadow-glow-hover relative overflow-hidden group min-h-[56px] flex items-center justify-center gap-3 will-change-transform"
                style={{ translateZ: 0 }}
              >
                <Sparkles size={18} className="text-yellow-200" />
                <span className="relative z-10">Enroll Your Child</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_0%,transparent_70%)]" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Book a visit to Zahra Daycare"
                className="btn-secondary shadow-premium hover:shadow-premium-lg relative overflow-hidden group min-h-[56px] flex items-center justify-center gap-3 will-change-transform"
                style={{ translateZ: 0 }}
              >
                <Flower size={18} className="text-rose-400" />
                <span className="relative z-10">Book a Visit</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10" />
              </motion.button>
            </div>
          </Reveal>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`bird-${i}`}
            className="absolute text-orange-400/60 drop-shadow-lg will-change-transform"
            style={{ 
              top: 100 + i * 150, 
              right: -100,
              translateZ: 0
            }}
            animate={{ 
              x: '-120vw',
              y: [0, -50, 50, 0],
              rotate: [-15, 15, -15]
            }}
            transition={{ 
              x: { duration: 20 + i * 5, repeat: Infinity, ease: "linear", delay: i * 5 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Bird size={24 + i * 10} className="animate-soft-float" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="absolute top-24 left-[20%] text-indigo-400/40 z-10 will-change-transform"
        style={{ translateZ: 0 }}
        animate={{ 
          x: [0, 20, 0],
          y: [0, -20, 0],
          rotate: [0, 360]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <Wind size={40} />
      </motion.div>

      {/* Additional Magical Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(6)].map((_, i) => {
          const Icon = i % 2 === 0 ? Heart : Star;
          const colors = ['text-rose-300', 'text-yellow-300', 'text-blue-300', 'text-purple-300'];
          const color = colors[i % colors.length];
          return (
            <motion.div
              key={`magic-${i}`}
              className={`absolute ${color} opacity-30 will-change-transform`}
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 100}%`,
                translateZ: 0
              }}
              animate={{ 
                y: [0, -50, 0],
                rotate: [0, 360],
                scale: [0.5, 1, 0.5],
                opacity: [0.1, 0.4, 0.1]
              }}
              transition={{ 
                duration: 10 + Math.random() * 10, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 3
              }}
            >
              <Icon size={20 + Math.random() * 30} fill="currentColor" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};


