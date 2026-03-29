import React, { useState, useMemo, memo, useEffect } from 'react';
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
    <section id="gallery" className="py-20">
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
              <span className="text-[#0f172a]">
                <ShinyText text="Little Moments, " speed={3} />
              </span>
              <span className="text-[#4facfe]">
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