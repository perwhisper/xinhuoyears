
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { HIGHLIGHT_IMAGES, COLORS } from '../constants';
import { X, Download, Share2, ZoomIn, Sparkles } from 'lucide-react';

const LanternDecoration: React.FC = () => (
  <motion.div 
    initial={{ y: -5, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatType: "mirror" }}
    className="absolute -top-3 -right-3 z-30 w-10 h-12 pointer-events-none drop-shadow-[0_5px_15px_rgba(196,30,58,0.4)]"
  >
    <svg viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="15" y="0" width="10" height="4" fill={COLORS.darkGold} />
      <ellipse cx="20" cy="22" rx="14" ry="18" fill={COLORS.red} />
      <path d="M10 22C10 12.0589 14.4772 4 20 4C25.5228 4 30 12.0589 30 22C30 31.9411 25.5228 40 20 40C14.4772 40 10 31.9411 10 22Z" fill="url(#lantern-grad)" fillOpacity="0.8" />
      <rect x="16" y="40" width="8" height="3" fill={COLORS.darkGold} />
      <rect x="19" y="43" width="2" height="7" fill={COLORS.red} />
      <defs>
        <radialGradient id="lantern-grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20 22) rotate(90) scale(18 10)">
          <stop stopColor="#FF5F6D" />
          <stop offset="1" stopColor={COLORS.red} />
        </radialGradient>
      </defs>
    </svg>
  </motion.div>
);

const PhotoCard: React.FC<{ 
  src: string; 
  index: number; 
  onClick: () => void; 
  isLarge?: boolean;
  className?: string;
}> = ({ src, index, onClick, isLarge = false, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const randomRotate = (index % 2 === 0 ? 1.8 : -1.8) * (Math.random() * 0.4 + 0.6);

  return (
    <div style={{ perspective: '1200px' }} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 60, rotateX: 15, scale: 0.85, filter: 'blur(20px)' },
          show: { 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            scale: 1,
            rotateZ: randomRotate,
            filter: 'blur(0px)',
            transition: { duration: 2.2, type: "spring", stiffness: 45, damping: 15 } 
          }
        }}
        whileHover={{ 
          scale: 1.08, 
          rotateZ: 0, 
          rotateX: 8,
          rotateY: index % 2 === 0 ? 5 : -5,
          y: -15,
          zIndex: 40,
          boxShadow: "0 40px 80px -15px rgba(0, 0, 0, 0.4), 0 0 25px rgba(255,215,0,0.2)"
        }}
        onClick={onClick}
        className="relative p-3 bg-white shadow-2xl rounded-2xl cursor-pointer group transition-all duration-500 overflow-visible"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 rounded-2xl border border-gray-100 pointer-events-none z-10" />
        
        <div className={`relative overflow-hidden bg-gray-50 rounded-xl ${isLarge ? 'aspect-[16/10]' : (index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square')}`}>
          {/* 高级骨架屏加载效果 */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center">
              <div className="w-full h-full bg-gradient-to-r from-gray-100 via-gray-200/50 to-gray-100 animate-[shimmer_2s_infinite]" 
                   style={{ backgroundSize: '200% 100%' }} />
              <Sparkles className="absolute w-6 h-6 text-gray-200 animate-pulse" />
            </div>
          )}
          
          <motion.img 
            src={src} 
            onLoad={() => setIsLoaded(true)}
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            animate={{ 
              opacity: isLoaded ? 1 : 0, 
              scale: isLoaded ? 1 : 1.1,
              filter: isLoaded ? 'blur(0px)' : 'blur(10px)' 
            }}
            transition={{ duration: 1.5 }}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            alt={`Highlight ${index}`}
          />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/10 backdrop-blur-[2px]">
             <motion.div 
               style={{ translateZ: '50px' }}
               className="bg-white/95 p-4 rounded-full shadow-2xl"
             >
                <ZoomIn className="w-6 h-6 text-[#C41E3A]" />
             </motion.div>
          </div>
        </div>
        
        <div className="pt-6 pb-2 px-1 flex justify-between items-center" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-400 font-black tracking-[0.3em] uppercase">Archive Collection</span>
            <span className="text-[7px] text-gray-300 font-mono mt-1">2025_MEM_{index.toString().padStart(2, '0')}</span>
          </div>
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-2.5 h-2.5 rounded-full bg-[#C41E3A]" 
            style={{ boxShadow: '0 0 15px #C41E3A' }}
          />
        </div>

        {isLarge && <LanternDecoration />}
      </motion.div>
    </div>
  );
};

export const HighlightsModule: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 }
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#F5F0E1] overflow-hidden relative">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
        <motion.div 
          animate={{ rotate: [-3, 3, -3], scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="text-[30rem] font-brush text-[#C41E3A] -translate-y-10"
        >
          悦
        </motion.div>
      </div>

      <div className="p-10 pt-24 text-center relative z-10 shrink-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="inline-block mb-3 px-4 py-1.5 border border-[#C41E3A]/15 rounded-full"
        >
          <span className="text-[9px] text-[#C41E3A] font-black tracking-[0.5em] uppercase">Memorable Gallery</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 2 }}
          className="text-5xl font-serif-bold text-[#C41E3A] mb-4 tracking-widest"
        >
          精彩瞬间
        </motion.h2>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        className="flex-1 overflow-y-auto no-scrollbar px-6 pb-48"
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-12">
            <PhotoCard 
              src={HIGHLIGHT_IMAGES[0]} 
              index={0} 
              isLarge 
              onClick={() => setSelectedImg(HIGHLIGHT_IMAGES[0])} 
              className="col-span-2 px-2"
            />
            {HIGHLIGHT_IMAGES.slice(1).map((img, i) => (
              <PhotoCard 
                key={i + 1}
                src={img} 
                index={i + 1} 
                onClick={() => setSelectedImg(img)}
              />
            ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedImg && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[110] bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center p-6"
                onClick={() => setSelectedImg(null)}
            >
                <div className="absolute top-12 left-0 right-0 px-10 flex justify-between items-center">
                    <div className="flex flex-col border-l-4 border-[#FFD700] pl-6">
                        <span className="text-white text-3xl font-serif-bold tracking-[0.3em]">薪火记忆</span>
                        <span className="text-[#FFD700] text-[9px] font-black tracking-[0.5em] mt-3 uppercase opacity-60">Eternal Flame Story</span>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      onClick={() => setSelectedImg(null)} 
                      className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-2xl border border-white/20"
                    >
                        <X className="w-8 h-8 text-white" />
                    </motion.button>
                </div>

                <motion.div 
                    initial={{ scale: 0.8, opacity: 0, rotateY: 30 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    className="relative max-w-full p-4 bg-white rounded-3xl shadow-[0_80px_160px_rgba(0,0,0,0.8)]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img src={selectedImg} className="max-w-full max-h-[60vh] object-contain rounded-2xl" />
                </motion.div>

                <div className="mt-28 flex space-x-16">
                    <div className="flex flex-col items-center space-y-4">
                        <motion.button whileHover={{ y: -10 }} className="w-18 h-18 rounded-full bg-[#FFD700]/10 flex items-center justify-center border border-[#FFD700]/30">
                            <Download className="w-8 h-8 text-[#FFD700]" />
                        </motion.button>
                        <span className="text-[10px] text-white/40 font-black tracking-[0.5em] uppercase">Save</span>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <motion.button whileHover={{ y: -10 }} className="w-18 h-18 rounded-full bg-white/5 flex items-center justify-center border border-white/20">
                            <Share2 className="w-8 h-8 text-white/70" />
                        </motion.button>
                        <span className="text-[10px] text-white/40 font-black tracking-[0.5em] uppercase">Share</span>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
