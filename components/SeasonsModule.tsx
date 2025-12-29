
import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { COLORS, SEASONS_DATA } from '../constants';
import { SeasonData } from '../types'; // Import from types.ts instead of constants
import { Sparkles, X, Download, Share2 } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.8, delayChildren: 0.6 } // 极慢节奏
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 70, filter: 'blur(20px)', scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 2.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

const GoldDust: React.FC<{ count?: number }> = ({ count = 20 }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: -20, x: `${Math.random() * 100}%`, opacity: 0 }}
        animate={{ 
          y: '110vh', 
          x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
          opacity: [0, 1, 0] 
        }}
        transition={{ 
          duration: Math.random() * 6 + 5, 
          repeat: Infinity, 
          delay: Math.random() * 5 
        }}
        className="absolute w-1.5 h-1.5 rounded-full bg-[#FFD700]"
        style={{ filter: 'blur(1.5px)', boxShadow: '0 0 8px #FFD700' }}
      />
    ))}
  </div>
);

const LeafParticles: React.FC<{ color: string }> = ({ color }) => (
  <div className="absolute inset-0 pointer-events-none z-0">
    {Array.from({ length: 15 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: -50, rotate: 0, x: `${Math.random() * 100}%`, opacity: 0 }}
        animate={{ 
          y: '110vh', 
          rotate: 720,
          x: [`${Math.random() * 100}%`, `${Math.random() * 100 + (Math.random() * 20 - 10)}%`],
          opacity: [0, 0.6, 0] 
        }}
        transition={{ duration: 12 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 10 }}
        className="absolute text-2xl"
        style={{ color }}
      >
        🍃
      </motion.div>
    ))}
  </div>
);

export const SeasonsOverview: React.FC = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      className="h-full w-full flex flex-col items-center justify-center bg-[#F5F0E1] relative overflow-hidden p-10"
    >
      <GoldDust count={35} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} className="text-[35rem] font-brush flex flex-wrap justify-center w-[130%]">
          春 夏 秋 冬
        </motion.div>
      </motion.div>

      <div className="z-10 text-center w-full max-w-sm">
        <motion.h1 variants={itemVariants} className="text-7xl font-brush gold-gradient-text leading-tight mb-6 tracking-tighter">
          我们的 2025
        </motion.h1>
        <motion.h1 variants={itemVariants} className="text-7xl font-brush gold-gradient-text leading-tight mb-12 tracking-tighter">
          藏在四季里
        </motion.h1>
        <motion.div variants={itemVariants} className="h-[3px] bg-gradient-to-r from-transparent via-[#C41E3A]/30 to-transparent w-full mb-12" />
        <motion.p variants={itemVariants} className="text-base text-gray-500 font-bold leading-relaxed tracking-[0.35em] mb-4 opacity-70">
          春的相聚、夏的告别
        </motion.p>
        <motion.p variants={itemVariants} className="text-base text-gray-500 font-bold leading-relaxed tracking-[0.35em] opacity-70">
          秋的新生、冬的温暖
        </motion.p>
      </div>
    </motion.div>
  );
};

export const SeasonDetail: React.FC<{ id: string; season: SeasonData }> = ({ id, season }) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (idx: number) => {
    setLoadedImages(prev => ({ ...prev, [idx]: true }));
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      className="h-full w-full flex flex-col bg-[#F5F0E1] relative overflow-hidden p-8 pt-24"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/handmade-paper.png")' }} />
      {id === 'spring' && <GoldDust count={20} />}
      {id === 'autumn' && <LeafParticles color="#B8860B" />}
      {id === 'winter' && <LeafParticles color="#FFFFFF" />}

      <motion.div 
        variants={{ 
          hidden: { scale: 0, rotate: -360, opacity: 0 }, 
          show: { scale: 1, rotate: 0, opacity: 1, transition: { type: "spring", stiffness: 35, delay: 0.8 } } 
        }}
        className="absolute top-14 right-10 w-24 h-24 border-[8px] border-[#C41E3A] text-[#C41E3A] flex items-center justify-center font-serif-bold text-5xl rounded-3xl z-20 shadow-2xl bg-white/70 backdrop-blur-lg"
      >
        {season.seal}
      </motion.div>

      <div className="z-10 flex flex-col h-full max-w-lg mx-auto w-full">
        <motion.h2 variants={itemVariants} className="text-4xl font-serif-bold text-[#C41E3A] mb-8 leading-snug border-l-[15px] border-[#C41E3A] pl-8">
          {season.title}
        </motion.h2>
        
        <motion.div variants={itemVariants} className="space-y-4 mb-14">
          {season.desc.split('，').map((phrase, pi) => (
            <motion.p 
              key={pi} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5 + pi * 0.6, duration: 2 }}
              className="text-[17px] text-gray-600 font-black leading-relaxed tracking-widest"
            >
              {phrase}{pi < season.desc.split('，').length - 1 ? '，' : ''}
            </motion.p>
          ))}
        </motion.div>

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.6, delayChildren: 4 } }
          }}
          className="grid grid-cols-1 gap-10 flex-1 overflow-y-auto no-scrollbar pb-40"
        >
          {season.images.map((src, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              onClick={() => setSelectedImg(src)}
              className="relative p-4 bg-white border border-[#C41E3A]/15 rounded-[2.5rem] shadow-2xl active:scale-95 transition-all overflow-hidden"
            >
              <div className="aspect-[16/10] rounded-[1.8rem] overflow-hidden relative bg-gray-50">
                {!loadedImages[i] && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 animate-pulse flex items-center justify-center">
                     <Sparkles className="w-8 h-8 text-gray-200" />
                  </div>
                )}
                <motion.img 
                  src={src} 
                  onLoad={() => handleImageLoad(i)}
                  initial={{ opacity: 0, filter: 'blur(20px)' }}
                  animate={{ 
                    opacity: loadedImages[i] ? 1 : 0, 
                    filter: loadedImages[i] ? 'blur(0px)' : 'blur(20px)'
                  }}
                  transition={{ duration: 2 }}
                  className="w-full h-full object-cover" 
                  alt={`${id}-${i}`} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[120] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center p-8" 
            onClick={() => setSelectedImg(null)}
          >
            <motion.div 
              initial={{ scale: 0.8, rotateY: 45, opacity: 0 }} 
              animate={{ scale: 1, rotateY: 0, opacity: 1 }} 
              transition={{ type: "spring", stiffness: 70 }}
              className="relative p-6 bg-white rounded-[3rem] border-[10px] border-[#FFD700] shadow-[0_0_120px_rgba(255,215,0,0.5)]" 
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImg} className="max-w-full max-h-[60vh] rounded-[2rem]" />
              <div className="absolute -bottom-14 left-0 right-0 text-center text-[#FFD700] font-brush text-3xl tracking-[0.5em] drop-shadow-xl">
                薪火 2025・岁岁长安
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
