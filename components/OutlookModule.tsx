
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { REPORT_DATA } from '../constants';
import { Quote, Sparkles } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.6, delayChildren: 0.4 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 2 } }
};

export const OutlookModule: React.FC = () => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      className="h-full w-full flex flex-col bg-[#F5F0E1] overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto no-scrollbar p-10 pt-28 pb-40">
        <motion.section variants={itemVariants} className="mb-14">
          <h2 className="text-4xl font-serif-bold text-[#C41E3A] mb-6">2025・薪火印记</h2>
          <div className="p-8 bg-white rounded-[2.5rem] border-2 border-[#C41E3A]/5 shadow-2xl relative">
            <Quote className="absolute -top-4 -left-4 w-12 h-12 text-[#C41E3A]/10" />
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 2 }}
              className="text-gray-600 text-base font-bold leading-relaxed"
            >
              这一年，我们并肩走过 <span className="text-[#C41E3A]">80</span> 场志愿活动，汇聚 <span className="text-[#C41E3A]">1600</span> 人次的汗水，筹集 <span className="text-[#C41E3A]">8000</span> 元善款。
            </motion.p>
          </div>
        </motion.section>

        <section className="mb-14">
          <motion.h2 variants={itemVariants} className="text-4xl font-serif-bold text-[#B8860B] mb-8">2026・向新而行</motion.h2>
          <div className="grid grid-cols-1 gap-4">
            {REPORT_DATA.outlook.map((text, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + i * 0.5, duration: 1.8 }}
                className="flex items-center p-6 bg-white rounded-3xl border border-gold-50 shadow-md"
              >
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-10 h-10 rounded-full bg-[#FFD700]/15 flex items-center justify-center mr-5 shrink-0"
                >
                  <Sparkles className="w-5 h-5 text-[#B8860B]" />
                </motion.div>
                <span className="text-sm font-black text-gray-700">{text}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.div variants={itemVariants} className="mt-12 text-center opacity-30">
          <div className="w-1 bg-gradient-to-b from-[#C41E3A] to-transparent mx-auto h-20 mb-4" />
          <p className="text-[10px] font-black tracking-[0.5em] text-[#C41E3A] uppercase">薪火同行 • 2026 重邮见</p>
        </motion.div>
      </div>
    </motion.div>
  );
};
