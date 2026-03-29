import React, { useState, useMemo, memo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

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
    src: 'https://lh3.googleusercontent.com/d/1nzcRdnzunqBIUViM3m6K-6hTf6es3J_M',
    title: 'Pre School Room',
  },
  {
    id: 2,
    type: 'image',
    category: ['Toddler Room'],
    src: 'https://lh3.googleusercontent.com/d/1HuO7E0uT_qOKMss_MtTIogaL4hHZwjEp',
    title: 'Toddler Room',
  },
  // VIDEOS FROM ROOT
  { id: 3, type: 'video', category: ['Outdoor Play'], src: '/VIDEOA.mp4', title: 'Video A' },
  { id: 4, type: 'video', category: ['Pre School Room'], src: '/VIDEOB.mp4', title: 'Video B' },
  { id: 5, type: 'video', category: ['Toddler Room'], src: '/VIDEOC.mp4', title: 'Video C' },
  { id: 6, type: 'video', category: ['Outdoor Play'], src: '/VIDEOD.mp4', title: 'Video D' },
  { id: 7, type: 'video', category: ['Creative Arts'], src: '/VIDEOE.mp4', title: 'Video E' },
  { id: 8, type: 'video', category: ['Special Events'], src: '/VIDEOF.mp4', title: 'Video F' },
  { id: 9, type: 'video', category: ['Pre School Room'], src: '/VIDEOG.mp4', title: 'Video G' },
  { id: 10, type: 'video', category: ['Toddler Room'], src: '/VIDEOH.mp4', title: 'Video H' },
  { id: 11, type: 'video', category: ['Outdoor Play'], src: '/VIDEOI.mp4', title: 'Video I' },
  { id: 12, type: 'video', category: ['Creative Arts'], src: '/VIDEOJ.mp4', title: 'Video J' },
];

const categories: Category[] = [
  'All',
  'Pre School Room',
  'Toddler Room',
  'Outdoor Play',
  'Creative Arts',
  'Special Events',
];

// --- CARD ---
const MediaCard = memo(({ item, onClick }: any) => {
  return (
    <motion.div
      layout
      className="cursor-pointer overflow-hidden rounded-2xl bg-black"
      onClick={() => onClick(item)}
      whileHover={{ y: -5 }}
    >
      <div className="aspect-video flex items-center justify-center relative group">
        {item.type === 'video' ? (
          <>
            <video
              src={item.src}
              className="w-full h-full object-contain"
              muted
              loop
              playsInline
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => e.currentTarget.pause()}
            />
            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300 flex items-center justify-center">
              {/* PLAY BUTTON */}
              <motion.div
                className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-indigo-500/50"
                whileHover={{ scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Play size={28} className="text-indigo-600 ml-1" fill="currentColor" />
              </motion.div>
            </div>
          </>
        ) : (
          <img
            src={item.src}
            className="w-full h-full object-cover"
            alt={item.title}
          />
        )}
      </div>
    </motion.div>
  );
});

// --- MAIN ---
export const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [index, setIndex] = useState(0);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: '0px 0px -100px 0px' });

  const filtered = useMemo(() => {
    return galleryItems;
  }, []);

  const openItem = (item: any) => {
    setSelectedItem(item);
    setIndex(galleryItems.findIndex(i => i.id === item.id));
  };

  const navigate = (dir: 'next' | 'prev') => {
    let i = index;
    i = dir === 'next' ? i + 1 : i - 1;

    if (i < 0) i = galleryItems.length - 1;
    if (i >= galleryItems.length) i = 0;

    setIndex(i);
    setSelectedItem(galleryItems[i]);
  };

  useEffect(() => {
    document.body.style.overflow = selectedItem ? 'hidden' : 'auto';
  }, [selectedItem]);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* PREMIUM HEADING */}
        <motion.div
          ref={headingRef}
          className="text-center mb-20 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* SUBTITLE - SOFT ACCENT */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="mb-3"
          >
            <span className="text-sm sm:text-base font-medium tracking-widest uppercase text-indigo-500">
              Gallery
            </span>
          </motion.div>

          {/* MAIN HEADING WITH GRADIENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-serif leading-tight tracking-tight"
              style={{
                backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #9333ea 35%, #ec4899 70%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(99, 102, 241, 0.3), 0 0 60px rgba(147, 51, 234, 0.2)',
                filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.2))',
              }}
            >
              Little Moments, Big Memories
            </h2>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Discover the joy, laughter, and growth captured in every frame
          </motion.p>
        </motion.div>

        {/* GRID */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5"
        >
          <AnimatePresence>
            {filtered.map(item => (
              <MediaCard key={item.id} item={item} onClick={openItem} />
            ))}
          </AnimatePresence>
        </motion.div>
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