import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Cloud, Sun, Sparkles, Flower } from 'lucide-react';
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

  // Generate random bird animations
  const birdAnimations = useMemo(() => {
    const createBirdAnimation = (direction: 'ltr' | 'rtl') => ({
      duration: Math.random() * 8 + 12, // Slower: 12-20 seconds
      delay: Math.random() * 3,
      startX: direction === 'ltr' ? -150 : window.innerWidth,
      endX: direction === 'ltr' ? window.innerWidth : -150,
      scaleX: direction === 'rtl' ? -1 : 1,
      topPosition: Math.random() * 25 + 8,
    });
    return [
      createBirdAnimation('ltr'),  // Left to right
      createBirdAnimation('rtl'),  // Right to left
    ];
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

      {/* Clouds Layer - Static for performance */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        {/* Static cloud background */}
      </div>

      {/* Ground Layer - Hills with Animated Flowers */}
      <motion.div 
        style={{ y: smoothHillsY, translateZ: 0 }}
        className="absolute bottom-0 left-0 w-full h-[32vh] sm:h-[45vh] z-10 will-change-transform"
      >
        {/* SVG Hill Background - Green Ground */}
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
        
        {/* Decorative Flowers - Left side */}
        <div className="absolute bottom-8 sm:bottom-12 left-[5%] sm:left-[8%] pointer-events-none">
          <div style={{ width: '140px', height: '140px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
            <dotlottie-wc 
              src="https://lottie.host/b4e6ce8d-2921-4c06-ac6a-be59ec8ab072/G4ibccSRTb.lottie" 
              autoPlay={true}
              loop={true}
              style={{ width: '100%', height: '100%' }} 
            />
          </div>
        </div>

        {/* Decorative Flowers - Right side */}
        <div className="absolute bottom-10 sm:bottom-16 right-[8%] sm:right-[12%] pointer-events-none">
          <div style={{ width: '160px', height: '160px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
            <dotlottie-wc 
              src="https://lottie.host/5b8a6921-78d3-48f3-a3dc-0a926ec5278b/UiO3NjMdQS.lottie" 
              autoPlay={true}
              loop={true}
              style={{ width: '100%', height: '100%' }} 
            />
          </div>
        </div>

        {/* Additional Flowers - Center left */}
        <div className="absolute bottom-12 sm:bottom-20 left-[35%] pointer-events-none opacity-80">
          <div style={{ width: '130px', height: '130px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.08))' }}>
            <dotlottie-wc 
              src="https://lottie.host/b4e6ce8d-2921-4c06-ac6a-be59ec8ab072/G4ibccSRTb.lottie" 
              autoPlay={true}
              loop={true}
              style={{ width: '100%', height: '100%' }} 
            />
          </div>
        </div>

        {/* Additional Flowers - Center right */}
        <div className="absolute bottom-14 sm:bottom-24 right-[32%] pointer-events-none opacity-75">
          <div style={{ width: '150px', height: '150px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.08))' }}>
            <dotlottie-wc 
              src="https://lottie.host/5b8a6921-78d3-48f3-a3dc-0a926ec5278b/UiO3NjMdQS.lottie" 
              autoPlay={true}
              loop={true}
              style={{ width: '100%', height: '100%' }} 
            />
          </div>
        </div>

        {/* Additional Flowers - Right center */}
        <div className="absolute bottom-9 sm:bottom-14 right-[18%] pointer-events-none opacity-85">
          <div style={{ width: '145px', height: '145px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.09))' }}>
            <dotlottie-wc 
              src="https://lottie.host/b4e6ce8d-2921-4c06-ac6a-be59ec8ab072/G4ibccSRTb.lottie" 
              autoPlay={true}
              loop={true}
              style={{ width: '100%', height: '100%' }} 
            />
          </div>
        </div>

        {/* Additional Flowers - Far right */}
        <div className="absolute bottom-11 sm:bottom-18 right-[2%] sm:right-[3%] pointer-events-none opacity-70">
          <div style={{ width: '135px', height: '135px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.08))' }}>
            <dotlottie-wc 
              src="https://lottie.host/5b8a6921-78d3-48f3-a3dc-0a926ec5278b/UiO3NjMdQS.lottie" 
              autoPlay={true}
              loop={true}
              style={{ width: '100%', height: '100%' }} 
            />
          </div>
        </div>
      </motion.div>

      {/* Foreground Layer - Content */}
      <motion.div 
        style={{ y: smoothContentY, translateZ: 0 }}
        className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center will-change-transform drop-shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
      >
        <div className="max-w-6xl w-full">
          <Reveal delay={1.4} y={20} width="100%">
            <p className="text-indigo-600 font-bold uppercase tracking-[0.2em] text-xs sm:text-sm mb-4">
              Zahra Day Care Center
            </p>
          </Reveal>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-indigo-950 leading-[1.1] mb-6 sm:mb-10 tracking-tight">
            <ShinyText text={headline} speed={3} shineColor="rgba(255,255,255,0.8)" />
          </h1>
          
          <Reveal delay={1.8} y={20} width="100%">
            <p className="text-sm sm:text-lg lg:text-xl text-indigo-900/90 mb-8 sm:mb-14 font-semibold max-w-4xl mx-auto leading-relaxed tracking-wide italic">
              <ShinyText 
                text="“Where care meets learning, and every child shines.”" 
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

      {/* Flying Bird Animation - Left to Right & Right to Left simultaneously */}
      {birdAnimations.map((bird, idx) => (
        <motion.div
          key={idx}
          className="absolute z-15 pointer-events-none will-change-transform"
          style={{
            top: `${bird.topPosition}%`,
            scaleX: bird.scaleX,
            translateZ: 0,
          }}
          initial={{ x: bird.startX, opacity: 0 }}
          animate={{
            x: bird.endX,
            opacity: [0, 0.8, 0.8, 0],
            y: [0, -25 + Math.random() * 15, 0],
          }}
          transition={{
            duration: bird.duration,
            delay: bird.delay,
            repeat: Infinity,
            repeatDelay: 3,
            ease: 'easeInOut',
          }}
        >
          <div style={{ width: '180px', height: '180px', marginLeft: '-90px' }}>
            <dotlottie-wc 
              src="https://lottie.host/445dd3d9-ed11-4553-8be0-59b374de9c4b/cQbie0Hqr4.lottie" 
              autoPlay={true}
              loop={true}
              style={{ width: '100%', height: '100%' }} 
            />
          </div>
        </motion.div>
      ))}

      {/* Floating Elements - Removed for performance optimization */}
    </section>
  );
};


