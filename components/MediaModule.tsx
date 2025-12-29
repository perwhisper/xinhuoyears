
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { REPORT_DATA } from '../constants';
import { NumberTicker } from './NumberTicker';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.6, delayChildren: 0.5 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.8, ease: "easeOut" } }
};

export const MediaVoiceSlide: React.FC = () => (
  <motion.div 
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    className="h-full w-full flex flex-col items-center justify-center bg-[#C41E3A] p-10 text-center relative overflow-hidden"
  >
    <motion.div 
      initial={{ opacity: 0, scale: 1.6 }}
      whileInView={{ opacity: 0.05, scale: 1 }}
      transition={{ duration: 3 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
    >
      <div className="text-[30rem] font-brush text-white">响</div>
    </motion.div>
    
    <motion.h3 variants={itemVariants} className="text-[#FFD700] text-xs font-black tracking-[0.6em] uppercase mb-6 opacity-40">Voice of Xinhuo</motion.h3>
    <motion.p variants={itemVariants} className="text-3xl font-serif-bold text-white mb-4">这一年，我们的声音</motion.p>
    <motion.p variants={itemVariants} className="text-2xl font-serif-bold text-white mb-4">被听见约</p>
    <motion.div variants={itemVariants} className="text-9xl font-serif-bold gold-gradient-text italic leading-none mb-6">
      <NumberTicker value={1900} />
    </motion.div>
    <motion.p variants={itemVariants} className="text-2xl font-serif-bold text-white">次</p>
  </motion.div>
);

export const MediaWorksSlide: React.FC = () => {
  // Constructed media array from mediaStats to fix the error
  const mediaItems = [
    { platform: "小红书", count: REPORT_DATA.mediaStats.xhs },
    { platform: "抖音", count: REPORT_DATA.mediaStats.dy },
    { platform: "公众号", count: REPORT_DATA.mediaStats.gzh }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      className="h-full w-full flex flex-col items-center justify-center bg-[#F5F0E1] p-10"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-serif-bold text-[#C41E3A] mb-12 text-center">全平台年度作品发布</motion.h2>
      <motion.div variants={itemVariants} className="w-full max-w-sm space-y-6">
        {mediaItems.map((m, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.4 }}
            className="flex items-center justify-between p-6 bg-white rounded-3xl shadow-lg border-l-8 border-[#C41E3A]"
          >
            <span className="text-lg font-black text-gray-700">{m.platform}</span>
            <div className="text-3xl font-serif-bold text-[#C41E3A]">
              <NumberTicker value={m.count} /> <span className="text-sm">篇</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export const MediaImpactSlide: React.FC = () => (
  <motion.div 
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    className="h-full w-full flex flex-col items-center justify-center bg-[#C41E3A] p-10 text-center"
  >
    <motion.h3 variants={itemVariants} className="text-[#FFD700] text-xs font-black tracking-[0.6em] uppercase mb-8 opacity-40">Top Impact</motion.h3>
    <motion.p variants={itemVariants} className="text-xl font-serif-bold text-white/80 mb-6 tracking-widest">年度最具影响力推送</motion.p>
    <motion.div variants={itemVariants} className="p-8 rounded-[3rem] bg-white/5 backdrop-blur-3xl border border-white/10 mb-8 w-full max-w-xs">
      {/* Used mediaStats.topArticles instead of wechatStats */}
      <h2 className="text-2xl font-serif-bold text-white italic">《{REPORT_DATA.mediaStats.topArticles[0]}》</h2>
    </motion.div>
    {/* Used mediaStats.totalViews instead of wechatStats */}
    <motion.p variants={itemVariants} className="text-2xl font-serif-bold text-[#FFD700]">触达约 {REPORT_DATA.mediaStats.totalViews} 颗心灵</motion.p>
  </motion.div>
);
