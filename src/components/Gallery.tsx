import React, { useState, useMemo, memo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Reveal } from './Reveal';
import ShinyText from './ShinyText';

// --- TYPES ---
type Category =
  | 'All'
  | 'Pre School Room'
  | 'Toddler Room'
  | 'Outdoor Play'
  | 'Creative Arts'
  | 'Special Events';

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  category: Category[];
  src: string;
  title: string;
}

// --- STATIC IMAGES & VIDEOS ---
const galleryItems: GalleryItem[] = [
  // IMAGES
  {
    id: 1,
    type: 'image',
    category: ['Pre School Room'],
    src: '/IMG_0201.webp',
    title: 'Pre School Room',
  },
  {
    id: 2,
    type: 'image',
    category: ['Toddler Room'],
    src: '/IMG_0256.webp',
    title: 'Toddler Room',
  },
  // NEW LOCAL IMAGES
  {
    id: 13,
    type: 'image',
    category: ['Pre School Room', 'Creative Arts'],
    src: '/IMG_0201.webp',
    title: 'Classroom Learning Area',
  },
  {
    id: 14,
    type: 'image',
    category: ['Pre School Room'],
    src: '/IMG_0202.webp',
    title: 'Interactive Learning Station',
  },
  {
    id: 15,
    type: 'image',
    category: ['Creative Arts'],
    src: '/IMG_0206.webp',
    title: 'Art & Craft Activities',
  },
  {
    id: 16,
    type: 'image',
    category: ['Outdoor Play'],
    src: '/IMG_0254.webp',
    title: 'Outdoor Adventure Area',
  },
  {
    id: 17,
    type: 'image',
    category: ['Special Events'],
    src: '/IMG_0255.webp',
    title: 'Special Event Celebration',
  },
  {
    id: 18,
    type: 'image',
    category: ['Toddler Room'],
    src: '/IMG_0256.webp',
    title: 'Toddler Play Space',
  },
  {
    id: 19,
    type: 'image',
    category: ['Pre School Room', 'Creative Arts'],
    src: '/IMG_0257.webp',
    title: 'Creative Learning Corner',
  },
  // VIDEOS FROM ROOT
  { id: 3, type: 'video', category: ['Outdoor Play'], src: '/VIDEOA.mp4', title: 'Outdoor Play Time' },
  { id: 4, type: 'video', category: ['Pre School Room'], src: '/VIDEOB.mp4', title: 'Classroom Activities' },
  { id: 5, type: 'video', category: ['Toddler Room'], src: '/VIDEOC.mp4', title: 'Toddler Fun' },
  { id: 6, type: 'video', category: ['Outdoor Play'], src: '/VIDEOD.mp4', title: 'Playground Adventures' },
  { id: 7, type: 'video', category: ['Creative Arts'], src: '/VIDEOE.mp4', title: 'Arts & Crafts' },
  { id: 9, type: 'video', category: ['Pre School Room'], src: '/VIDEOG.mp4', title: 'Learning Time' },
  { id: 10, type: 'video', category: ['Toddler Room'], src: '/VIDEOH.mp4', title: 'Toddler Play' },
  { id: 11, type: 'video', category: ['Outdoor Play'], src: '/VIDEOI.mp4', title: 'Outdoor Games' },
  { id: 12, type: 'video', category: ['Creative Arts'], src: '/VIDEOJ.mp4', title: 'Creative Session' },
  // NEW WHATSAPP VIDEOS
  {
    id: 20,
    type: 'video',
    category: ['Outdoor Play', 'Special Events'],
    src: '/WhatsApp Video 2026-03-25 at 9.15.46 PM.mp4',
    title: 'Outdoor Fun Moments',
  },
  {
    id: 21,
    type: 'video',
    category: ['Creative Arts', 'Pre School Room'],
    src: '/WhatsApp Video 2026-03-25 at 9.15.52 PM.mp4',
    title: 'Creative Workshop',
  },
  {
    id: 22,
    type: 'video',
    category: ['Special Events'],
    src: '/WhatsApp Video 2026-03-25 at 9.20.20 PM (1).mp4',
    title: 'Celebration Moments',
  },
];

const categories: Category[] = [
  'All',
  'Pre School Room',
  'Toddler Room',
  'Outdoor Play',
  'Creative Arts',
  'Special Events',
];

// --- LAZY VIDEO with IntersectionObserver ---
const LazyVideo = memo(({ src, poster }: { src: string; poster: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={isVisible ? src : undefined}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      onMouseEnter={(e) => { if (isVisible) e.currentTarget.play(); }}
      onMouseLeave={(e) => e.currentTarget.pause()}
    />
  );
});

// --- CARD ---
const MediaCard = memo(({ item, onClick }: { item: GalleryItem; onClick: (item: GalleryItem) => void }) => {
  const handleClick = useCallback(() => onClick(item), [item, onClick]);

  return (
    <motion.div
      className="cursor-pointer overflow-hidden rounded-premium-lg bg-black shadow-premium hover:shadow-premium-lg hover-lift group"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-video flex items-center justify-center relative overflow-hidden">
        {item.type === 'video' ? (
          <>
            <LazyVideo
              src={item.src}
              poster={
                item.id === 3 ? '/IMG_0254.webp' : 
                item.id === 4 ? '/IMG_0201.webp' : 
                item.id === 5 ? '/IMG_0256.webp' :
                item.id === 6 ? '/IMG_0254.webp' :
                item.id === 7 ? '/IMG_0206.webp' :
                item.id === 9 ? '/IMG_0202.webp' :
                item.id === 10 ? '/IMG_0256.webp' :
                item.id === 11 ? '/IMG_0254.webp' :
                item.id === 12 ? '/IMG_0257.webp' :
                item.id === 20 ? '/IMG_0255.webp' :
                item.id === 21 ? '/IMG_0206.webp' :
                '/IMG_0257.webp'
              }
            />
            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300 flex items-center justify-center">
              {/* PLAY BUTTON */}
              <div className="w-16 h-16 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-premium-lg group-hover:shadow-glow group-hover:scale-110 transition-transform duration-300">
                <Play size={32} className="text-indigo-600 ml-1" fill="currentColor" />
              </div>
            </div>
          </>
        ) : (
          <img
            src={item.src}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            alt={item.title}
            loading="lazy"
            decoding="async"
          />
        )}
        </div>
      </motion.div>
    );
  });

// --- MAIN ---
export const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [index, setIndex] = useState(0);

  const openItem = useCallback((item: GalleryItem) => {
    setSelectedItem(item);
    setIndex(galleryItems.findIndex(i => i.id === item.id));
  }, []);

  const navigate = useCallback((dir: 'next' | 'prev') => {
    setIndex(prev => {
      let i = dir === 'next' ? prev + 1 : prev - 1;
      if (i < 0) i = galleryItems.length - 1;
      if (i >= galleryItems.length) i = 0;
      setSelectedItem(galleryItems[i]);
      return i;
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedItem ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedItem]);

  return (
    <section id="gallery" className="py-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADING - MATCHING ABOUT SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal y={20} width="100%">
            <div className="inline-block px-5 py-2.5 mb-6 rounded-full bg-white border border-indigo-100 shadow-md">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4facfe] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold text-indigo-600 uppercase tracking-widest">Gallery</span>
              </div>
            </div>
          </Reveal>
          
          <Reveal y={30} delay={0.3} width="100%">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
              <span className="text-black">
                <ShinyText text="Little Moments, " speed={3} />
              </span>
              <span className="text-[#3F2BFF]">
                <ShinyText text="Big Memories" speed={3} />
              </span>
            </h2>
          </Reveal>

          <Reveal y={20} delay={0.5} width="100%">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              <ShinyText text="Discover the joy, laughter, and growth captured in every frame" speed={4} />
            </p>
          </Reveal>
        </div>

        {/* GRID — removed layout animation from container for performance */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          <AnimatePresence>
            {galleryItems.map(item => (
              <MediaCard key={item.id} item={item} onClick={openItem} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={() => setSelectedItem(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* CLOSE */}
            <button
              className="absolute top-5 right-5 text-white hover:text-indigo-400 transition-colors"
              onClick={() => setSelectedItem(null)}
            >
              <X size={28} />
            </button>

            {/* NAV */}
            <button
              className="absolute left-5 text-white hover:text-indigo-400 transition-colors"
              onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
            >
              <ChevronLeft size={30} />
            </button>

            <button
              className="absolute right-5 text-white hover:text-indigo-400 transition-colors"
              onClick={(e) => { e.stopPropagation(); navigate('next'); }}
            >
              <ChevronRight size={30} />
            </button>

            {/* CONTENT */}
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center">
              {selectedItem.type === 'video' ? (
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  className="max-w-[90vw] max-h-[80vh] rounded-lg"
                />
              ) : (
                <img
                  src={selectedItem.src}
                  className="max-w-[90vw] max-h-[80vh] rounded-lg"
                  alt={selectedItem.title}
                />
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};