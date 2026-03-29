import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Cloud, Sun, Trees as Tree, Bird, Sparkles, Flower, Flower2, Wind, Heart, Star } from 'lucide-react';
import gsap from 'gsap';
import ShinyText from './ShinyText';
import { Reveal } from './Reveal';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef1 = useRef<HTMLButtonElement>(null);
  const buttonRef2 = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  // Parallax transforms with refined speeds
  const skyY = useTransform(scrollY, [0, 1000], [0, 150]);
  const cloudsY = useTransform(scrollY, [0, 1000], [0, 300]);
  const hillsY = useTransform(scrollY, [0, 1000], [0, 400]);
  const foregroundY = useTransform(scrollY, [0, 1000], [0, -100]);
  const contentY = useTransform(scrollY, [0, 500], [0, 100]);

  const springConfig = { stiffness: 80, damping: 25, restDelta: 0.001 };
  const smoothSkyY = useSpring(skyY, springConfig);
  const smoothCloudsY = useSpring(cloudsY, springConfig);
  const smoothHillsY = useSpring(hillsY, springConfig);
  const smoothForegroundY = useSpring(foregroundY, springConfig);
  const smoothContentY = useSpring(contentY, springConfig);

  const headline = "A Safe and Happy Place for Your Child to Learn and Grow";
  const words = headline.split(" ");

  useEffect(() => {
    const buttons = [buttonRef1.current, buttonRef2.current];
    
    buttons.forEach(btn => {
      if (!btn) return;
      
      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.4,
          ease: "power3.out"
        });
      };
      
      const onMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)"
        });
      };
      
      btn.addEventListener('mousemove', onMouseMove);
      btn.addEventListener('mouseleave', onMouseLeave);
      
      return () => {
        btn.removeEventListener('mousemove', onMouseMove);
        btn.removeEventListener('mouseleave', onMouseLeave);
      };
    });
  }, []);

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

      {/* Clouds Layer */}
      <motion.div 
        style={{ y: smoothCloudsY, translateZ: 0 }}
        className="absolute inset-0 z-[5] will-change-transform"
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/70 drop-shadow-md will-change-transform"
            aria-hidden="true"
            style={{ 
              top: 40 + i * 120, 
              left: -400,
              translateZ: 0
            }}
            animate={{ x: '140vw' }}
            transition={{ 
              duration: 25 + i * 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 8
            }}
          >
            <Cloud size={60 + i * 40} fill="currentColor" />
          </motion.div>
        ))}
      </motion.div>

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
        
        {/* Flowers and Nature Elements */}
        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
          {/* Scattered Flowers */}
          {[...Array(12)].map((_, i) => {
            const Icon = i % 2 === 0 ? Flower : Flower2;
            const colors = ['text-rose-400', 'text-pink-400', 'text-yellow-400', 'text-orange-400', 'text-purple-400'];
            const color = colors[i % colors.length];
            return (
              <motion.div
                key={i}
                className={`absolute ${color} opacity-80 will-change-transform`}
                style={{
                  bottom: `${10 + Math.random() * 30}%`,
                  left: `${5 + Math.random() * 90}%`,
                  translateZ: 0
                }}
                animate={{ 
                  rotate: [-10, 10, -10],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
              >
                <Icon size={16 + Math.random() * 20} />
              </motion.div>
            );
          })}

          {/* Butterflies (Sparkles) */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`butterfly-${i}`}
              className="absolute text-yellow-200 opacity-80 will-change-transform"
              style={{
                bottom: `${20 + Math.random() * 40}%`,
                left: `${Math.random() * 100}%`,
                translateZ: 0
              }}
              animate={{ 
                x: [0, 50, -50, 0],
                y: [0, -30, 30, 0],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 45, -45, 0]
              }}
              transition={{ 
                duration: 8 + Math.random() * 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 2
              }}
            >
              <Sparkles size={12 + Math.random() * 10} />
            </motion.div>
          ))}
        </div>
        
        {/* Playground Elements */}
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
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.8 + i * 0.08, 
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={`inline-block mr-1.5 sm:mr-3 will-change-transform ${
                  ['Safe', 'Happy', 'Learn', 'Grow'].includes(word.replace(/[.,]/g, '')) 
                  ? 'text-indigo-600 drop-shadow-[0_0_10px_rgba(79,70,229,0.2)]' 
                  : ''
                }`}
                style={{ translateZ: 0 }}
              >
                <ShinyText text={word} speed={3} shineColor="rgba(255,255,255,0.8)" />
              </motion.span>
            ))}
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
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0">
              <motion.button
                ref={buttonRef1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Enroll your child at Zahra Daycare"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-full font-bold text-xs sm:text-sm shadow-[0_10px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_15px_30px_rgba(79,70,229,0.4)] transition-all relative overflow-hidden group min-h-[48px] flex items-center justify-center gap-2 will-change-transform"
                style={{ translateZ: 0 }}
              >
                <Sparkles size={16} className="text-yellow-300 animate-pulse" />
                <span className="relative z-10">Enroll Your Child</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
              </motion.button>
              <motion.button
                ref={buttonRef2}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Book a visit to Zahra Daycare"
                className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-indigo-600 border-2 border-indigo-100/50 rounded-full font-bold text-xs sm:text-sm shadow-[0_10px_20px_rgba(0,0,0,0.05)] transition-all hover:bg-white hover:border-indigo-200 hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] inner-shadow-sm min-h-[48px] flex items-center justify-center gap-2 will-change-transform"
                style={{ translateZ: 0 }}
              >
                <Flower size={16} className="text-rose-400 animate-bounce" />
                Book a Visit
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


