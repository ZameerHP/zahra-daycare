import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Baby, Palette, ShieldCheck, ArrowRight } from 'lucide-react';
import ShinyText from './ShinyText';
import { Reveal } from './Reveal';

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(y2, { stiffness: 100, damping: 30 });

  const cards = [
    {
      icon: Baby,
      title: "Individual Attention",
      color: "from-[#4facfe] to-[#00f2fe]",
    },
    {
      icon: Palette,
      title: "Play-Based Learning",
      color: "from-[#a78bfa] to-[#c084fc]",
    },
    {
      icon: ShieldCheck,
      title: "Safe Environment",
      color: "from-[#22c55e] to-[#4ade80]",
    }
  ];

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-2 sm:py-4 lg:py-6 bg-[#f8fafc] overflow-hidden flex items-center scroll-mt-24"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}
    >
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: smoothY1, translateZ: 0 }}
          className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl will-change-transform" 
        />
        <motion.div 
          style={{ y: smoothY2, translateZ: 0 }}
          className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-100/40 rounded-full blur-3xl will-change-transform" 
        />

        {/* Decorative glows only - no floating animations for performance */}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col gap-3 items-center lg:items-start text-center lg:text-left">
            <Reveal y={20}>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white shadow-md border border-indigo-50">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4facfe] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold text-indigo-600 uppercase tracking-widest">About Us</span>
              </div>
            </Reveal>

            <div className="flex flex-col gap-2 w-full items-center lg:items-start">
              <Reveal y={20} delay={0.3} width="100%">
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#0f172a] tracking-tight leading-tight text-center lg:text-left">
                  <ShinyText text="About Zahra Daycare" speed={3} />
                </h2>
              </Reveal>
              
              <Reveal y={20} delay={0.4} width="100%">
                <h3 className="text-base sm:text-lg lg:text-2xl font-semibold text-[#3F2BFF] text-center lg:text-left">
                  <ShinyText text="A Magical Place to Grow" speed={4} />
                </h3>
              </Reveal>

              <Reveal y={20} delay={0.5} width="100%">
                <p className="text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium text-center lg:text-left">
                  <ShinyText text="At Zahra Daycare, we believe childhood is a magical journey of discovery and growth. Our dedicated team creates a warm, nurturing environment where each child develops their unique potential through play, creativity, and meaningful connections." speed={5} />
                </p>
              </Reveal>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
              {cards.map((card, i) => (
                <Reveal key={i} y={30} delay={0.6 + i * 0.1} width="100%">
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="card-premium-hover p-6 flex flex-col items-center lg:items-start text-center lg:text-left group h-full overflow-hidden"
                    style={{ translateZ: 0 }}
                  >
                    <motion.div 
                      className={`w-14 h-14 rounded-premium bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-5 shadow-premium group-hover:shadow-glow`}
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <card.icon size={28} />
                    </motion.div>
                    <span className="text-base lg:text-lg font-bold text-indigo-950 leading-snug">
                      <ShinyText text={card.title} speed={3} />
                    </span>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            <Reveal y={20} delay={0.9}>
              <motion.button
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="Book a tour of Zahra Daycare"
                className="btn-primary mt-2 flex items-center justify-center gap-3"
                style={{ translateZ: 0 }}
              >
                Book a Tour
                <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={20} />
                </motion.span>
              </motion.button>
            </Reveal>
          </div>

          {/* Right Column: Visual */}
          <div className="relative z-20 mt-6 lg:mt-0">
            <Reveal scale={0.9} y={30} delay={0.4} width="100%">
              <motion.div 
                className="relative rounded-[32px] overflow-hidden shadow-premium-lg border-[8px] border-white aspect-video bg-slate-100 w-full mx-auto lg:max-w-none hover-scale group" 
                style={{ translateZ: 0 }}
                whileHover={{ boxShadow: "0 30px 60px rgba(79, 70, 229, 0.2)" }}
              >
                <img 
                  src="/outside.jpg" 
                  alt="Zahra Daycare Environment"
                  className="w-full h-full object-cover rounded-[28px] group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  style={{ borderRadius: '28px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 to-transparent pointer-events-none" />
              </motion.div>
            </Reveal>
            
            {/* Decorative elements */}
            <motion.div 
              style={{ y: smoothY1, translateZ: 0 }}
              className="absolute -top-12 -right-12 w-48 h-48 sm:w-64 sm:h-64 bg-yellow-200/30 rounded-full blur-3xl -z-10 will-change-transform" 
            />
            <motion.div 
              style={{ y: smoothY2, translateZ: 0 }}
              className="absolute -bottom-12 -left-12 w-56 h-56 sm:w-80 sm:h-80 bg-indigo-200/30 rounded-full blur-3xl -z-10 will-change-transform" 
            />
          </div>

        </div>
      </div>
    </section>
  );
};

