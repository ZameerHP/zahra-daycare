import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2000; // 2 seconds for a smooth, professional feel
    const interval = 20;
    const step = 100 / (duration / interval);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Small delay before starting the exit animation
          setTimeout(() => setIsExiting(true), 400);
          // Total time until onComplete is called
          setTimeout(onComplete, 1200);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, interval);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1], // Custom cubic-bezier for a "classy" slide up
      }
    }
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden"
        >
          {/* Subtle Background Texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise" />
          
          <div className="relative z-10 flex flex-col items-center w-full max-w-md px-8">
            {/* Logo Animation */}
            <motion.div
              variants={itemVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-10 relative"
            >
              <div className="w-40 h-40 rounded-3xl bg-white shadow-[0_30px_60px_rgba(79,70,229,0.2)] flex items-center justify-center overflow-hidden border border-indigo-50 p-3">
                 <img 
                    src="/LOGOIS.png" 
                    alt="Daycare Logo"
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
              </div>
              {/* Subtle pulsing outer ring */}
              <motion.div 
                className="absolute -inset-6 rounded-[2.5rem] border border-indigo-100/50"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Title with Reveal Effect */}
            <div className="text-center mb-12 overflow-hidden">
              <motion.div
                variants={itemVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-indigo-950 tracking-tight mb-2">
                  Zahra <span className="text-indigo-600 italic font-serif">Daycare</span>
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-indigo-950/30">
                  Nurturing Future Stars
                </p>
              </motion.div>
            </div>

            {/* Modern Progress Bar */}
            <div className="w-full max-w-[240px] space-y-4">
              <div className="relative h-[3px] w-full bg-indigo-50 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-indigo-600"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
                {/* Shine effect that moves across the progress bar */}
                <motion.div 
                  className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ left: ['-20%', '120%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              <div className="flex justify-between items-center px-1">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-[9px] font-bold text-indigo-950/40 uppercase tracking-widest"
                >
                  {progress < 100 ? 'Initializing' : 'Welcome'}
                </motion.span>
                <motion.span 
                  className="text-[10px] font-mono font-bold text-indigo-600"
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
            </div>
          </div>

          {/* Bottom Branding Accent */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-12 flex items-center gap-3"
          >
            <div className="h-px w-6 bg-indigo-100" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-indigo-950/20">Quality Care</span>
            <div className="h-px w-6 bg-indigo-100" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
