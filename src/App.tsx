import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { Loader } from './components/Loader';
import { Menu, X } from 'lucide-react';

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

const Navbar = React.memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrolled = latest > 50;
    if (isScrolled !== scrolled) {
      setScrolled(isScrolled);
    }
  });

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
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ 
          y: { duration: 0.8 },
          opacity: { duration: 0.3 }
        }}
        className={`fixed left-0 right-0 z-40 transition-[top,padding] duration-700 ease-in-out ${
          scrolled ? 'top-2 px-4 sm:px-6 lg:px-8' : 'top-0 px-0'
        }`}
      >
        <div 
          className={`max-w-7xl mx-auto transition-[backdrop-filter,background-color,border-radius,box-shadow,padding] duration-700 ease-in-out ${
            scrolled 
              ? 'rounded-[1.5rem] bg-white/[0.02] backdrop-blur-[32px] border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] py-2 sm:py-2.5 px-6 sm:px-10' 
              : 'bg-transparent py-4 sm:py-5 px-5 sm:px-12'
          }`}
        >
          <div className="flex justify-between items-center">
            {/* Logo & Brand */}
            <a href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-lg border-2 border-indigo-100 overflow-hidden shadow-sm">
                <img 
                  src="/LOGOIS.webp" 
                  alt="Daycare Logo"
                  className="w-full h-full object-contain p-1"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="hidden sm:flex flex-col gap-0 leading-none">
                <span className="text-sm sm:text-base font-black text-indigo-950">Zahra</span>
                <span className="text-[10px] font-bold text-indigo-500 uppercase">Daycare</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8 items-center">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-[11px] lg:text-xs font-black text-indigo-950 hover:text-indigo-600 transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick('#contact')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-full font-black text-[10px] shadow-lg hover:shadow-xl transition-all uppercase tracking-wider"
              >
                Join Us
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-950 hover:bg-indigo-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-30 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { x: '100%' },
                visible: { 
                  x: 0,
                  transition: { 
                    type: 'spring', damping: 30, stiffness: 350, restDelta: 0.5,
                    when: "beforeChildren",
                    staggerChildren: 0.05
                  }
                },
                exit: { 
                  x: '100%',
                  transition: { type: 'spring', damping: 30, stiffness: 350, restDelta: 0.5 }
                }
              }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-white z-40 md:hidden shadow-2xl overflow-y-auto will-change-transform"
              style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
            >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-indigo-100 p-4 flex justify-between items-center z-10">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-lg border-2 border-indigo-100 overflow-hidden">
                  <img 
                    src="/LOGOIS.webp" 
                    alt="Logo"
                    className="w-full h-full object-contain p-1"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex flex-col gap-0 leading-none">
                  <span className="font-black text-indigo-950 text-sm">Zahra</span>
                  <span className="text-[10px] font-bold text-indigo-500 uppercase">Daycare</span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-950 hover:bg-indigo-200"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="px-4 py-4 flex flex-col gap-2 relative z-0">
              {navLinks.map((link) => (
                <motion.button
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
                  }}
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 text-sm font-black text-indigo-950 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all uppercase tracking-widest"
                >
                  {link.name}
                </motion.button>
              ))}
            </div>

            {/* Footer Button */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
              }}
              className="sticky bottom-0 bg-white border-t border-indigo-100 p-4 z-10"
            >
              <button
                onClick={() => handleNavClick('#contact')}
                className="w-full px-5 py-3 bg-indigo-600 text-white rounded-lg font-black text-base hover:bg-indigo-700 transition-all uppercase shadow-lg shadow-indigo-200 tracking-wider"
              >
                Join Us
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
      </AnimatePresence>
    </>
  );
});

const Footer = React.memo(() => {
  return (
    <footer 
      className="py-10 bg-indigo-50 border-t border-indigo-100 mt-auto"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md border border-indigo-50 bg-white p-1">
                <img 
                  src="/LOGOIS.webp" 
                  alt="Logo"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="text-base font-bold text-indigo-950 tracking-tight">
                Daycare
              </span>
            </div>
            <p className="text-indigo-900/80 text-[10px] font-medium leading-relaxed max-w-xs">
              Providing a magical world of learning and joy for your little ones since 2015. We focus on early childhood development in a safe, nurturing environment.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h5 className="font-bold text-indigo-950 text-[10px] uppercase tracking-wider">
              Quick Links
            </h5>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Why Us', href: '#why-us' },
                { name: 'Gallery', href: '#gallery' },
                { name: 'Parents', href: '#parents' },
                { name: 'Contact', href: '#contact' }
              ].map(item => (
                <a key={item.name} href={item.href} className="text-indigo-900/80 hover:text-indigo-600 transition-colors font-semibold text-[10px]">
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h5 className="font-bold text-indigo-950 text-[10px] uppercase tracking-wider">
              Contact Us
            </h5>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2 text-indigo-900/80 text-[10px] font-semibold">
                5515-137 Avenue NW, Edmonton, AB T5A3L4
              </div>
              <a href="tel:+17802466870" className="text-indigo-900/80 hover:text-indigo-600 font-semibold text-[10px]">
                +1 780-246-6870
              </a>
              <a href="mailto:zahradaycare786@gmail.com" className="text-indigo-900/80 hover:text-indigo-600 font-semibold text-[10px] break-all">
                zahradaycare786@gmail.com
              </a>
            </div>
          </div>

          {/* Map Section */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <h5 className="font-bold text-indigo-950 text-[10px] uppercase tracking-wider">
              Location
            </h5>
            <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-white h-40 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501.7541107671962!2d-113.42613899999996!3d53.5983778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a03d1a349e472f%3A0x82d84275fd873820!2sZahra%20Daycare%20Center!5e1!3m2!1sen!2sus!4v1774965057504!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Zahra Daycare Location"
              />
            </div>
          </div>

          {/* Hours */}
          <div className="flex flex-col gap-4">
            <h5 className="font-bold text-indigo-950 text-[10px] uppercase tracking-wider">
              Opening Hours
            </h5>
            <div className="flex flex-col gap-2 text-indigo-900/80 text-[10px] font-semibold">
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
        
        <div className="mt-8 pt-6 border-t border-indigo-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-indigo-400 font-bold text-[8px] uppercase tracking-widest">
            © 2026 Daycare. All rights reserved.
          </p>
          <div className="flex gap-6 text-indigo-400 font-bold text-[8px] uppercase tracking-widest">
            <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
});
