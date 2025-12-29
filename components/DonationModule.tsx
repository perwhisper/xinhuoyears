
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { REPORT_DATA } from '../constants';
import { NumberTicker } from './NumberTicker';
import { Heart } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.6, delayChildren: 0.5 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(15px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.8 } }
};

export const DonationTotalSlide: React.FC = () => (
  <motion.div 
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    className="h-full w-full flex flex-col items-center justify-center bg-[#F5F0E1] p-10 text-center relative"
  >
    <motion.div 
      initial={{ opacity: 0, rotate: -30 }}
      whileInView={{ opacity: 0.03, rotate: 0 }}
      transition={{ duration: 3 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
    >
      <div className="text-[30rem] font-brush text-[#C41E3A]">爱</div>
    </motion.div>
    
    <motion.div variants={itemVariants} className="mb-8 inline-block p-4 rounded-full bg-[#C41E3A]/5">
      <Heart className="w-12 h-12 text-[#C41E3A] fill-[#C41E3A]" />
    </motion.div>
    <motion.p variants={itemVariants} className="text-3xl font-serif-bold text-[#C41E3A] mb-4">这一年我们收到的捐款</motion.p>
    <motion.div variants={itemVariants} className="text-9xl font-serif-bold gold-gradient-text italic leading-none mb-6">
      <NumberTicker value={8000} />
    </motion.div>
    <motion.p variants={itemVariants} className="text-2xl font-serif-bold text-[#C41E3A]">元</motion.p>
  </motion.div>
);

export const DonationListSlide: React.FC = () => (
  <motion.div 
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    className="h-full w-full flex flex-col items-center justify-center bg-[#F5F0E1] p-8 overflow-y-auto no-scrollbar"
  >
    <motion.h2 variants={itemVariants} className="text-2xl font-serif-bold text-[#C41E3A] mb-8 text-center">善意汇聚明细</motion.h2>
    <motion.div variants={itemVariants} className="w-full max-w-sm space-y-4">
      {/* Fixed mapping by using donations.details */}
      {REPORT_DATA.donations.details.map((d, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 + i * 0.3 }}
          className="p-5 rounded-2xl bg-white shadow-lg border border-red-50 flex justify-between items-center"
        >
          <span className="text-sm font-black text-gray-700">{d.name}</span>
          <span className="text-lg font-serif-bold text-[#C41E3A]">¥{d.amount}</span>
        </motion.div>
      ))}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="mt-12 p-8 rounded-[2.5rem] bg-[#C41E3A] text-white text-center shadow-xl"
      >
        <p className="text-sm font-bold leading-relaxed">每一笔捐款，不仅是数字，更是 1600+ 人次对公益的坚守。</p>
      </motion.div>
    </motion.div>
  </motion.div>
);
