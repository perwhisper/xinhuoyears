
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { NumberTicker } from './NumberTicker';
import { REPORT_DATA, COLORS } from '../constants';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8,
      delayChildren: 0.6
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(20px)', scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 2.2, ease: [0.22, 1, 0.36, 1] } 
  }
};

const bgVariants: Variants = {
  hidden: { opacity: 0, scale: 1.4 },
  show: { opacity: 0.04, scale: 1, transition: { duration: 5 } }
};

const LOCATION_CLOUD = [
  { text: "重邮校园", x: "50%", y: "45%", color: COLORS.red, weight: 32 },
  { text: "南山街道", x: "25%", y: "30%", color: COLORS.darkGold, weight: 26 },
  { text: "解放碑", x: "75%", y: "35%", color: COLORS.red, weight: 24 },
  { text: "巴南社区", x: "30%", y: "70%", color: COLORS.darkGold, weight: 20 },
  { text: "大坪", x: "65%", y: "75%", color: COLORS.red, weight: 22 },
  { text: "弹子石", x: "15%", y: "55%", color: COLORS.darkGold, weight: 18 },
  { text: "观音桥", x: "85%", y: "65%", color: COLORS.red, weight: 16 }
];

export const ActivityCountSlide: React.FC = () => (
  <motion.div 
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.3 }}
    className="h-full w-full flex flex-col items-center justify-center bg-[#F5F0E1] p-10 text-center relative"
  >
    <motion.div variants={bgVariants} className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <div className="text-[30rem] font-brush text-[#C41E3A]">奔</div>
    </motion.div>
    
    <motion.h3 variants={itemVariants} className="text-[#C41E3A] text-xs font-black tracking-[0.6em] uppercase mb-8 opacity-40">Total Activities</motion.h3>
    <motion.p variants={itemVariants} className="text-3xl font-serif-bold text-[#C41E3A] mb-4">这一年，我们共发起了</motion.p>
    <motion.div variants={itemVariants} className="text-9xl font-serif-bold gold-gradient-text italic leading-none mb-6">
      <NumberTicker value={80} />
    </motion.div>
    <motion.p variants={itemVariants} className="text-2xl font-serif-bold text-[#C41E3A]">场志愿活动招募</motion.p>
  </motion.div>
);

export const ParticipantCountSlide: React.FC = () => (
  <motion.div 
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.3 }}
    className="h-full w-full flex flex-col items-center justify-center bg-[#C41E3A] p-10 text-center relative overflow-hidden"
  >
    <motion.div variants={bgVariants} className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none">
      <div className="text-[30rem] font-brush text-white">众</div>
    </motion.div>
    
    <motion.h3 variants={itemVariants} className="text-[#FFD700] text-xs font-black tracking-[0.6em] uppercase mb-8 opacity-40">Recruitment Volume</motion.h3>
    <motion.p variants={itemVariants} className="text-3xl font-serif-bold text-white mb-4">吸引了约</motion.p>
    <motion.div variants={itemVariants} className="text-9xl font-serif-bold gold-gradient-text italic leading-none mb-6">
      <NumberTicker value={1600} suffix="+" />
    </motion.div>
    <motion.p variants={itemVariants} className="text-2xl font-serif-bold text-white">人次参与其中</motion.p>
  </motion.div>
);

export const ActivityDistributionSlide: React.FC = () => {
  const getCellColor = (i: number) => [COLORS.red, COLORS.darkGold, '#E63946', '#D4AF37'][i % 4];
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      className="h-full w-full flex flex-col items-center justify-center bg-[#F5F0E1] p-8 pb-32"
    >
      <motion.h2 variants={itemVariants} className="text-4xl font-serif-bold text-[#C41E3A] mb-16 text-center tracking-[0.2em] leading-relaxed">
        多元化的<br/>公益足迹
      </motion.h2>
      
      <motion.div variants={itemVariants} className="h-80 w-full relative mb-12 flex items-center justify-center">
        {/* 背景光环装饰 */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute w-64 h-64 rounded-full border border-[#C41E3A]/5 shadow-[inset_0_0_40px_rgba(196,30,58,0.03)]"
        />

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={REPORT_DATA.activityTypes} 
              cx="50%" 
              cy="50%" 
              innerRadius={85} 
              outerRadius={115} 
              paddingAngle={6}
              cornerRadius={8}
              dataKey="value" 
              stroke="none"
              animationBegin={1500}
              animationDuration={2500}
              animationEasing="ease-out"
            >
              {REPORT_DATA.activityTypes.map((_, i) => (
                <Cell 
                  key={i} 
                  fill={getCellColor(i)} 
                  className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* 中心“锦”字深色装饰 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, scale: 0, rotate: -45 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 2.2, duration: 2, type: "spring" }}
            className="flex flex-col items-center"
          >
            <div className="font-brush text-7xl text-[#C41E3A]/10 select-none">锦</div>
            <div className="h-[1px] w-8 bg-[#C41E3A]/10 mt-[-10px]"></div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 3.5 } }
        }}
        className="grid grid-cols-2 gap-x-12 gap-y-8 px-6"
      >
        {REPORT_DATA.activityTypes.slice(0, 4).map((t, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            className="flex items-center space-x-4 group"
          >
            <motion.div 
              whileHover={{ scale: 1.5 }}
              className="w-3.5 h-3.5 rounded-full shadow-lg transition-transform" 
              style={{ backgroundColor: getCellColor(i) }} 
            />
            <span className="text-[15px] text-gray-700 font-black tracking-[0.15em] opacity-80 group-hover:opacity-100 transition-opacity">
              {t.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export const LocationFootprintSlide: React.FC = () => (
  <motion.div 
    variants={containerVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false, amount: 0.3 }}
    className="h-full w-full flex flex-col items-center justify-center bg-[#F5F0E1] p-8"
  >
    <motion.h2 variants={itemVariants} className="text-3xl font-serif-bold text-[#C41E3A] mb-12">我们的服务遍布山城</motion.h2>
    <motion.div 
      variants={itemVariants}
      className="w-full h-96 relative bg-white/40 rounded-[4rem] border border-[#C41E3A]/5 shadow-2xl overflow-hidden"
    >
      {LOCATION_CLOUD.map((loc, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 1.5 + i * 0.4, duration: 2.5 }} 
          className="absolute font-serif-bold whitespace-nowrap"
          style={{ left: loc.x, top: loc.y, color: loc.color, fontSize: `${loc.weight}px`, transform: 'translate(-50%, -50%)' }}
        >
          {loc.text}
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);
