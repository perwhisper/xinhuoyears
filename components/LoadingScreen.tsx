
import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.05, filter: "blur(30px)", transition: { duration: 1.5, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#B03031]"
    >
      {/* 艺术底纹 */}
      <div className="absolute inset-0 opacity-10 flex items-center justify-center overflow-hidden pointer-events-none">
        <div className="text-[40rem] font-brush text-white select-none">薪</div>
      </div>

      <motion.div 
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
          boxShadow: ["0 0 20px rgba(251,200,75,0.2)", "0 0 50px rgba(251,200,75,0.5)", "0 0 20px rgba(251,200,75,0.2)"]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-32 h-32 mb-14 rounded-[2.5rem] bg-white flex items-center justify-center shadow-2xl relative z-10"
      >
        <img src="/vite.svg" alt="logo" className="w-12 h-12" />
      </motion.div>

      <div className="text-center relative z-10 px-6">
        <div className="text-[#FBC84B] font-serif-bold text-xl mb-6 tracking-[0.2em] leading-relaxed">
          正在生成 2025<br/><span className="text-lg opacity-80 font-bold">薪火志愿者协会年度报告</span>
        </div>
        <div className="w-64 h-[3px] bg-white/10 rounded-full overflow-hidden mx-auto">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#FBC84B] to-[#D4A017]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="mt-6 text-[#FBC84B]/40 font-mono text-sm tracking-widest">{Math.floor(progress)}%</div>
      </div>
    </motion.div>
  );
};
