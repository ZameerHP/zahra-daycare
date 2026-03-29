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
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Parents', href: '#parents' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ translateZ: 0 }}
      className={`fixed top-0 left-0 w-full z-50 px-6 transition-all duration-500 will-change-transform ${
        scrolled ? 'py-1' : 'py-2'
      }`}
    >
      <div className={`max-w-7xl mx-auto rounded-[2.5rem] transition-all duration-700 ${
        scrolled ? 'glass px-8 py-2 shadow-[0_10px_40px_rgba(79,70,229,0.15)] bg-white/70 backdrop-blur-xl border border-white/40' : 'px-6 py-2'
      }`}>
        <div className="flex justify-between items-center">
          <a 
            href="/" 
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Daycare Center Home"
          >
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-indigo-100 overflow-hidden border-2 border-indigo-50"
            >
              <img 
                src="/LOGOIS.png" 
                alt="Daycare Logo"
                className="w-full h-full object-contain p-1.5"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            <div className="flex flex-col -gap-1">
              <span className="text-xl font-black text-indigo-950 tracking-tighter leading-none">
                <ShinyText text="Zahra" speed={3} />
              </span>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em] leading-none">
                Daycare
              </span>
            </div>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-12 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-indigo-950 hover:text-indigo-600 font-black transition-all relative group py-2 text-sm uppercase tracking-[0.15em]"
              >
                <ShinyText text={link.name} speed={5} />
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-indigo-600 transition-all duration-500 ease-out group-hover:w-full rounded-full" />
              </a>
            ))}
            <motion.button 
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-indigo-600 text-white rounded-full font-black shadow-xl shadow-indigo-200 transition-all text-sm uppercase tracking-widest"
            >
              Join Us
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-950 transition-all hover:bg-indigo-100 active:scale-90"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
              className="fixed inset-0 bg-indigo-950/60 backdrop-blur-md z-[60] md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-4 right-4 bottom-4 w-[85%] max-w-sm bg-white/90 backdrop-blur-2xl z-[70] md:hidden shadow-[0_20px_80px_rgba(0,0,0,0.3)] flex flex-col rounded-[2.5rem] border border-white/40 overflow-hidden"
            >
              <div className="p-8 flex justify-between items-center border-b border-indigo-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg shadow-indigo-100 border-2 border-white bg-white p-1">
                    <img 
                      src="/LOGOIS.png" 
                      alt="Logo" 
                      className="w-full h-full object-contain" 
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex flex-col -gap-1">
                    <span className="font-black text-indigo-950 text-2xl leading-none tracking-tighter">Zahra</span>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em] leading-none">Daycare</span>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-950 active:scale-90 transition-all"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <motion.a 
                    key={link.name} 
                    href={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, type: 'spring' }}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-3xl font-black text-indigo-950 hover:text-indigo-600 transition-all flex items-center justify-between group py-2"
                  >
                    <span className="tracking-tighter">{link.name}</span>
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      className="w-3 h-3 bg-indigo-600 rounded-full shadow-lg shadow-indigo-200"
                    />
                  </motion.a>
                ))}
              </div>

              <div className="p-8 bg-indigo-50/30">
                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-indigo-200 active:scale-95 transition-all uppercase tracking-widest"
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
