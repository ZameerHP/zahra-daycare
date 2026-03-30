import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Loader } from './components/Loader';
import { Menu, X } from 'lucide-react';
import ShinyText from './components/ShinyText';

// Lazy load sections for better initial performance
const Hero = lazy(() => import('./components/Hero').then(m => ({ default: m.Hero })));
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs').then(m => ({ default: m.WhyChooseUs })));
const Gallery = lazy(() => import('./components/Gallery').then(m => ({ default: m.Gallery })));
const Testimonials = lazy(() => import('./components/Testimonials').then(m => ({ default: m.Testimonials })));
const Contact = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));
const CTA = lazy(() => import('./components/CTA').then(m => ({ default: m.CTA })));

export default function App() {
  const [loading, setLoading] = useState(true);
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="w-full"
          >
            <Navbar />
            <Suspense fallback={<div className="h-screen bg-white" />}>
              <Hero />
              <About />
              <WhyChooseUs />
              <Gallery />
              <Testimonials />
              <Contact />
              <CTA />
            </Suspense>
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Close mobile menu on scroll
      if (mobileMenuOpen && window.scrollY > 100) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Parents', href: '#parents' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ translateZ: 0 }}
      className={`fixed top-0 left-0 w-full z-50 px-3 sm:px-6 transition-all duration-500 will-change-transform ${
        scrolled ? 'py-1' : 'py-2'
      }`}
    >
      <div className={`max-w-7xl mx-auto rounded-xl sm:rounded-[2.5rem] transition-all duration-700 ${
        scrolled ? 'glass px-4 sm:px-8 py-2 shadow-[0_10px_40px_rgba(79,70,229,0.15)] bg-white/70 backdrop-blur-xl border border-white/40' : 'px-3 sm:px-6 py-2'
      }`}>
        <div className="flex justify-between items-center gap-2 sm:gap-4">
          <a 
            href="/" 
            className="flex items-center gap-2 sm:gap-3 group cursor-pointer flex-shrink-0"
            aria-label="Daycare Center Home"
          >
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg sm:rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-indigo-100 overflow-hidden border-2 border-indigo-50"
            >
              <img 
                src="/LOGOIS.png" 
                alt="Daycare Logo"
                className="w-full h-full object-contain p-1.5"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <div className="flex flex-col -gap-1 hidden xs:flex">
              <span className="text-base sm:text-xl font-black text-indigo-950 tracking-tighter leading-none">
                <ShinyText text="Zahra" speed={3} />
              </span>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-[0.15em] leading-none">
                Daycare
              </span>
            </div>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 lg:gap-12 items-center flex-1 justify-end">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.href)}
                className="text-indigo-950 hover:text-indigo-600 font-black transition-all relative group py-2 text-xs lg:text-sm uppercase tracking-[0.15em]"
              >
                <ShinyText text={link.name} speed={5} />
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-indigo-600 transition-all duration-500 ease-out group-hover:w-full rounded-full" />
              </button>
            ))}
            <motion.button 
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('#contact')}
              className="px-8 lg:px-10 py-3 lg:py-4 bg-indigo-600 text-white rounded-full font-black shadow-xl shadow-indigo-200 transition-all text-xs lg:text-sm uppercase tracking-widest whitespace-nowrap"
            >
              Join Us
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-950 transition-all hover:bg-indigo-100 active:scale-90 flex-shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-indigo-950/50 backdrop-blur-sm z-40 md:hidden"
              style={{ top: 0 }}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white/95 backdrop-blur-2xl z-50 md:hidden shadow-2xl flex flex-col rounded-none sm:rounded-l-[2.5rem] border-l border-white/40 overflow-hidden"
            >
              <div className="p-4 sm:p-6 flex justify-between items-center border-b border-indigo-50">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden shadow-lg shadow-indigo-100 border-2 border-white bg-white p-1">
                    <img 
                      src="/LOGOIS.png" 
                      alt="Logo" 
                      className="w-full h-full object-contain" 
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex flex-col -gap-1">
                    <span className="font-black text-indigo-950 text-lg sm:text-xl leading-none tracking-tighter">Zahra</span>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-[0.15em] leading-none">Daycare</span>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-950 active:scale-90 transition-all flex-shrink-0"
                  aria-label="Close menu"
                >
                  <X size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-2 sm:gap-4">
                {navLinks.map((link, i) => (
                  <motion.button 
                    key={link.name} 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, type: 'spring' }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-xl sm:text-2xl font-black text-indigo-950 hover:text-indigo-600 active:scale-95 transition-all flex items-center justify-between group py-2 sm:py-3 text-left"
                  >
                    <span className="tracking-tighter">{link.name}</span>
                    <motion.div 
                      className="w-2 h-2 sm:w-3 sm:h-3 bg-indigo-600 rounded-full shadow-lg shadow-indigo-200 flex-shrink-0"
                    />
                  </motion.button>
                ))}
              </div>

              <div className="p-4 sm:p-6 bg-indigo-50/50 border-t border-indigo-100">
                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => handleNavClick('#contact')}
                  className="w-full py-4 sm:py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg sm:text-xl shadow-2xl shadow-indigo-200 active:scale-95 transition-all uppercase tracking-widest"
                >
                  Join Us
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Footer = () => {
  return (
    <footer 
      className="py-10 bg-indigo-50 border-t border-indigo-100"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md border border-indigo-50 bg-white p-1">
                <img 
                  src="/LOGOIS.png" 
                  alt="Logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="text-lg font-bold text-indigo-950 tracking-tight">
                <ShinyText text="Daycare" speed={3} />
              </span>
            </div>
            <p className="text-indigo-900/80 text-xs font-medium leading-relaxed max-w-xs">
              <ShinyText text="Providing a magical world of learning and joy for your little ones since 2015. We focus on early childhood development in a safe, nurturing environment." speed={4} />
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h5 className="font-bold text-indigo-950 text-sm uppercase tracking-wider">
              <ShinyText text="Quick Links" speed={3} />
            </h5>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Why Us', href: '#why-us' },
                { name: 'Gallery', href: '#gallery' },
                { name: 'Parents', href: '#parents' },
                { name: 'Contact', href: '#contact' }
              ].map(item => (
                <a key={item.name} href={item.href} className="text-indigo-900/80 hover:text-indigo-600 transition-colors font-semibold text-xs">
                  <ShinyText text={item.name} speed={4} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h5 className="font-bold text-indigo-950 text-sm uppercase tracking-wider">
              <ShinyText text="Contact Us" speed={3} />
            </h5>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2 text-indigo-900/80 text-xs font-semibold">
                <ShinyText text="5515-137 Avenue NW, Edmonton, AB T5A3L4" speed={4} />
              </div>
              <a href="tel:+17802466870" className="text-indigo-900/80 hover:text-indigo-600 font-semibold text-xs">
                <ShinyText text="+1 780-246-6870" speed={4} />
              </a>
              <a href="mailto:zahradaycare786@gmail.com" className="text-indigo-900/80 hover:text-indigo-600 font-semibold text-xs break-all">
                <ShinyText text="zahradaycare786@gmail.com" speed={4} />
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-4">
            <h5 className="font-bold text-indigo-950 text-sm uppercase tracking-wider">
              <ShinyText text="Opening Hours" speed={3} />
            </h5>
            <div className="flex flex-col gap-2 text-indigo-900/80 text-xs font-semibold">
              <div className="flex justify-between">
                <span>Mon - Fri:</span>
                <span>7:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sat - Sun:</span>
                <span className="text-rose-500">Closed</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-indigo-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-indigo-400 font-bold text-[10px] uppercase tracking-widest">
            © 2026 Daycare. All rights reserved.
          </p>
          <div className="flex gap-6 text-indigo-400 font-bold text-[10px] uppercase tracking-widest">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
