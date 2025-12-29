
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { REPORT_DATA } from '../constants';

export const TimelineModule: React.FC = () => {
  // 父容器 Variant
  const listContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
        delayChildren: 2.2, // 等待标题播放完毕后再展示列表
      }
    }
  };

  // 子节点 Variant
  const itemVariant: Variants = {
    hidden: { 
      opacity: 0, 
      x: -40, 
      scale: 0.8,
      filter: "blur(4px)"
    },
    show: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 50, 
        damping: 20,   
        duration: 1.6  
      }
    }
  };

  // 线条 Variant
  const lineVariant: Variants = {
    hidden: { height: 0 },
    show: { 
      height: '100%',
      transition: { duration: 4, ease: "easeInOut", delay: 2.2 } 
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#F5F0E1] relative p-10 pt-28 overflow-hidden">
      <motion.div 
        variants={lineVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="absolute top-0 left-0 w-1 bg-[#C41E3A]/15 ml-14 origin-top" 
      />
      
      <div className="z-10 flex flex-col h-full max-w-lg mx-auto w-full">
        {/* 标题动画分步化 */}
        <div className="text-5xl font-serif-bold text-center leading-tight mb-16 flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="text-[#C41E3A]"
          >
            我们的
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: 0.9 }}
            className="gold-gradient-text italic my-2 drop-shadow-sm"
          >
            2025
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 1.6 }}
            className="text-[#C41E3A] tracking-[0.2em]"
          >
            薪火志
          </motion.span>
        </div>

        <motion.div 
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex-1 overflow-y-auto no-scrollbar relative pl-10 pb-24"
        >
          {REPORT_DATA.milestones.map((m, i) => (
            <motion.div 
              key={i}
              variants={itemVariant}
              className="mb-14 relative flex items-start"
            >
              <div className="absolute -left-[26px] w-14 h-14 rounded-full bg-white border-4 border-[#C41E3A] flex items-center justify-center text-2xl shadow-2xl z-10 overflow-hidden">
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 1.0 }} 
                >
                  {m.icon}
                </motion.span>
                <motion.div 
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }} 
                  className="absolute inset-0 bg-[#C41E3A]/5"
                />
              </div>

              <div className="ml-12 p-8 rounded-[2.5rem] bg-white border-l-[12px] border-[#C41E3A] shadow-xl flex-1 hover:shadow-2xl transition-all duration-300 active:scale-[0.98]">
                <div className="text-[10px] font-black text-[#C41E3A] tracking-[0.4em] mb-2 uppercase opacity-40">
                  {m.date}
                </div>
                <div className="text-xl font-serif-bold text-gray-800 mb-3">
                  {m.title}
                </div>
                <p className="text-xs text-gray-400 font-bold leading-relaxed tracking-wider">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 4.5 }} 
            className="flex justify-center mt-8 opacity-20"
          >
            <div className="w-2 h-2 rounded-full bg-[#C41E3A]" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
