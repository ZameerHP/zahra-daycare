import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote, Heart } from 'lucide-react';
import ShinyText from './ShinyText';
import { Reveal } from './Reveal';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Mother of 4yo Liam",
    content: "Zahra Daycare has been a second home for Liam. The teachers are so caring and the environment is truly magical. We've seen incredible progress in his social skills.",
    rating: 5,
    image: "https://picsum.photos/seed/parent1/100/100"
  },
  {
    name: "Michael Chen",
    role: "Father of 3yo Chloe",
    content: "I've seen so much growth in Chloe's social skills and creativity since she started here. The facilities are top-notch and the staff is exceptionally professional.",
    rating: 5,
    image: "https://picsum.photos/seed/parent2/100/100"
  },
  {
    name: "Emily Davis",
    role: "Mother of 5yo Noah",
    content: "The best decision we made for Noah. He wakes up every morning excited to go to daycare. The curriculum is perfectly balanced between play and learning.",
    rating: 5,
    image: "https://picsum.photos/seed/parent3/100/100"
  },
  {
    name: "David Wilson",
    role: "Father of 2yo Mia",
    content: "The attention to detail and personalized care Mia receives is outstanding. We feel so safe knowing she's in such a nurturing environment.",
    rating: 5,
    image: "https://picsum.photos/seed/parent4/100/100"
  }
];

export const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  }, []);
  
  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)',
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)',
    }),
  };

  return (
    <section id="parents" className="py-6 sm:py-8 bg-[#f8fafc] relative overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}>
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-100/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-100/30 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Side: Content */}
          <div className="lg:w-[35%] text-center lg:text-left">
            <Reveal x={-50}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-indigo-50 mb-4 sm:mb-6">
                <Heart className="text-rose-500" size={16} fill="currentColor" />
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Testimonials</span>
              </div>
            </Reveal>
            <Reveal x={-50} delay={0.3}>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-indigo-950 mb-4 leading-tight">
                <ShinyText text="What " speed={3} />
                <span className="text-indigo-600 italic font-serif">
                  <ShinyText text="Parents" speed={3} shineColor="rgba(79, 70, 229, 0.4)" />
                </span>
                <ShinyText text=" Say" speed={3} />
              </h2>
            </Reveal>
            <Reveal x={-50} delay={0.5}>
              <p className="text-indigo-900/80 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 font-medium">
                <ShinyText text="Discover why families trust Zahra Daycare for their children's early education and care." speed={4} />
              </p>
            </Reveal>
            
            <Reveal y={20} delay={0.7}>
              <div className="hidden lg:flex gap-4">
                <button 
                  onClick={() => { prev(); setIsAutoPlaying(false); }}
                  aria-label="Previous testimonial"
                  className="p-4 rounded-full bg-white text-indigo-600 shadow-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 border border-indigo-50"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => { next(); setIsAutoPlaying(false); }}
                  aria-label="Next testimonial"
                  className="p-4 rounded-full bg-white text-indigo-600 shadow-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 border border-indigo-50"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </Reveal>
          </div>

          {/* Right Side: Slider */}
          <div className="lg:w-[65%] w-full relative">
            <div className="relative h-[260px] sm:h-[300px] flex items-center">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 }
                  }}
                  className="absolute inset-0 will-change-transform"
                  style={{ translateZ: 0 }}
                >
                  <div className="h-full bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 shadow-[0_32px_64px_-16px_rgba(79,70,229,0.1)] border border-indigo-50 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 sm:p-8 text-indigo-50 group-hover:text-indigo-100 transition-colors duration-500">
                      <Quote size={80} className="sm:w-[100px] sm:h-[100px]" fill="currentColor" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex gap-1 mb-4 sm:mb-6">
                        {[...Array(testimonials[index].rating)].map((_, i) => (
                          <Star key={i} className="text-yellow-400 fill-current" size={16} />
                        ))}
                      </div>
                      
                      <p className="text-base sm:text-lg lg:text-xl text-indigo-950 font-medium leading-relaxed mb-6 sm:mb-8">
                        <ShinyText text={`"${testimonials[index].content}"`} speed={4} />
                      </p>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                      <div className="relative">
                        <img 
                          src={testimonials[index].image}
                          alt={testimonials[index].name}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-indigo-100 shadow-md object-cover"
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white border-2 border-white">
                          <Heart size={10} fill="currentColor" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-indigo-950">
                          <ShinyText text={testimonials[index].name} speed={3} />
                        </h3>
                        <p className="text-indigo-600/70 text-xs sm:text-sm font-medium">
                          <ShinyText text={testimonials[index].role} speed={4} />
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Navigation */}
            <div className="flex lg:hidden justify-center gap-4 mt-8">
              <button 
                onClick={() => { prev(); setIsAutoPlaying(false); }}
                aria-label="Previous testimonial"
                className="p-3 rounded-full bg-white text-indigo-600 shadow-lg border border-indigo-50 active:scale-95 transition-transform"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => { next(); setIsAutoPlaying(false); }}
                aria-label="Next testimonial"
                className="p-3 rounded-full bg-white text-indigo-600 shadow-lg border border-indigo-50 active:scale-95 transition-transform"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center lg:justify-start gap-3 mt-6 lg:mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === index ? 'w-12 bg-indigo-600' : 'w-4 bg-indigo-200 hover:bg-indigo-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
