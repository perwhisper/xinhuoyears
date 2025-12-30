
import React from 'react';
import { motion, Variants } from 'framer-motion';

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 }
  }
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)', scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)', 
    scale: 1,
    transition: { duration: 2.4, ease: [0.22, 1, 0.36, 1] } 
  }
};

export const Slide: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  bg?: string;
  glowColor?: string;
  id?: string;
}> = ({ children, className = "", bg = "bg-[#EFE6DA]", glowColor = "#B03031", id }) => (
  <motion.section 
    id={id}
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.1 }}
    className={`snap-section h-screen w-full flex flex-col items-center justify-center p-10 text-center relative overflow-hidden shrink-0 ${bg} ${className}`}
  >
    {/* 动态光晕背景点缀 */}
    <div className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] rounded-full blur-[140px] pointer-events-none opacity-10" style={{ backgroundColor: glowColor }} />
    <div className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] rounded-full blur-[140px] pointer-events-none opacity-10" style={{ backgroundColor: '#FBC84B' }} />
    
    {children}
  </motion.section>
);

export const BigText: React.FC<{ children: React.ReactNode; color?: string; className?: string }> = ({ children, color = "text-[#B03031]", className = "" }) => (
  <motion.div variants={itemVariants} className={`font-serif-bold leading-[1.4] tracking-tight ${color} ${className}`}>
    {children}
  </motion.div>
);

export const SmallText: React.FC<{ children: React.ReactNode; color?: string; className?: string }> = ({ children, color = "text-gray-500/80", className = "" }) => (
  <motion.div variants={itemVariants} className={`font-black tracking-[0.4em] uppercase ${color} ${className}`}>
    {children}
  </motion.div>
);

// Added ScrollGuide component to fix missing reference in App.tsx
export const ScrollGuide: React.FC<{ light?: boolean }> = ({ light = false }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.6, 0], y: [0, 8, 0] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-50"
  >
    <div className={`w-[1px] h-10 ${light ? 'bg-[#B03031]/20' : 'bg-[#B03031]/30'}`} />
    <span className={`text-[8px] mt-3 font-black tracking-[0.6em] uppercase ${light ? 'text-[#B03031]/40' : 'text-[#B03031]/40'}`}>
      Swipe Up
    </span>
  </motion.div>
);
