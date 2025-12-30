
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Heart, Sparkles, Send } from 'lucide-react';
import { COLORS } from '../constants';

const DEFAULT_BLESSINGS = [
  "薪火相传，点亮 2026！",
  "祝愿协会在新年里更上层楼。",
  "在大爱中前行，薪火不息。",
  "重邮薪火，温暖你我。",
  "让每一份善意都能汇聚成光。",
  "南山下的志愿情，一生难忘。",
  "愿薪火的温暖传遍山城的每个角落。"
];

const FloatingEmbers: React.FC = () => {
  const [embers, setEmbers] = useState<{ 
    id: number; 
    x: string; 
    size: number; 
    duration: number; 
    delay: number; 
    color: string; 
    opacity: number;
    blur: number;
  }[]>([]);

  useEffect(() => {
    const newEmbers = Array.from({ length: 30 }).map((_, i) => {
      const isGold = Math.random() > 0.4;
      const size = Math.random() * 4 + 1;
      return {
        id: i,
        x: `${Math.random() * 100}%`,
        size: size,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 10,
        color: isGold ? COLORS.yellow : COLORS.red,
        opacity: Math.random() * 0.3 + 0.1,
        blur: size > 3 ? Math.random() * 2 : 0,
      };
    });
    setEmbers(newEmbers);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {embers.map((ember) => (
        <motion.div
          key={ember.id}
          initial={{ opacity: 0, y: '110%' }}
          animate={{ 
            opacity: [0, ember.opacity, 0],
            y: ['110%', '-10%'],
            x: [ember.x, `${parseFloat(ember.x) + (Math.random() * 15 - 7.5)}%`]
          }}
          transition={{
            duration: ember.duration,
            repeat: Infinity,
            delay: ember.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            left: ember.x,
            width: ember.size,
            height: ember.size,
            backgroundColor: ember.color,
            borderRadius: '50%',
            filter: `blur(${ember.blur}px)`,
          }}
        />
      ))}
    </div>
  );
};

export const BlessingWallModule: React.FC<{ title?: string }> = ({ title = "写下你的 2026 祝愿" }) => {
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [blessings, setBlessings] = useState<string[]>(DEFAULT_BLESSINGS);
  const [isFocused, setIsFocused] = useState(false);

  // Fetch blessings from backend
  useEffect(() => {
    fetch('/api/wishes')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setBlessings(prev => [...data, ...prev]);
        }
      })
      .catch(err => console.log("Backend not available, using local storage"));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    const newWish = comment.trim();
    setBlessings(prev => [newWish, ...prev]);
    setSubmitted(true);
    
    // Post to backend
    fetch('/api/wishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newWish })
    }).catch(err => console.log("Failed to save to backend"));

    setTimeout(() => setSubmitted(false), 3000);
    setComment("");
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#EFE6DA] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10" />
      <FloatingEmbers />

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-20 h-full flex flex-col p-6 pt-12 pb-10 max-w-lg mx-auto w-full"
      >
        <div className="text-center mb-6 shrink-0">
          <motion.div 
            animate={{ filter: ["drop-shadow(0 0 5px rgba(176,48,49,0.1))", "drop-shadow(0 0 15px rgba(176,48,49,0.2))", "drop-shadow(0 0 5px rgba(176,48,49,0.1))"] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-3"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B03031] to-[#8A2627] p-[1.5px]">
              <div className="w-full h-full bg-[#EFE6DA] rounded-[13px] flex items-center justify-center">
                <Heart className="w-7 h-7 text-[#B03031]" />
              </div>
            </div>
          </motion.div>
          <h2 className="text-2xl font-serif-bold text-[#B03031] mb-1 tracking-[0.2em]">{title}</h2>
          <p className="text-[#B03031]/20 text-[6px] font-black tracking-[0.5em] uppercase italic">Burning Forever • Xinhuo</p>
        </div>

        <div className="bg-white/30 backdrop-blur-xl border border-[#B03031]/10 p-5 rounded-[2.5rem] shadow-xl flex-1 flex flex-col mb-6 overflow-hidden relative">
          <form onSubmit={handleSubmit} className="mb-6 shrink-0 relative z-10">
            <div className="relative group">
              <AnimatePresence>
                {!comment && (
                  <motion.label
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: isFocused ? 0.1 : 0.2 }}
                    className="absolute top-5 left-5 pointer-events-none text-[#B03031] text-xs select-none"
                  >
                    写下你的 2026 祝福吧～
                  </motion.label>
                )}
              </AnimatePresence>

              <textarea 
                value={comment}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setComment(e.target.value)}
                className={`w-full h-24 p-5 bg-white/40 rounded-3xl border transition-all duration-500 text-[#B03031] text-xs outline-none resize-none
                  ${comment || isFocused ? 'border-[#B03031]/30' : 'border-[#B03031]/10'}
                `}
              />
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className={`w-full mt-3 py-3.5 rounded-2xl font-black text-xs transition-all duration-500 flex items-center justify-center space-x-2 
                ${comment.length > 0 ? 'bg-[#B03031] text-white shadow-lg' : 'bg-gray-200 text-gray-400'}
              `}
            >
              <Send className="w-3.5 h-3.5" />
              <span className="tracking-[0.2em] uppercase">点亮星火</span>
            </motion.button>
          </form>

          <div className="flex-1 overflow-hidden relative z-10">
            <motion.div animate={{ y: ["0%", "-50%"] }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="space-y-3.5 pt-4">
              {[...blessings, ...blessings].map((b, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/40 border border-[#B03031]/5 backdrop-blur-md flex items-start space-x-3 shadow-sm">
                  <Sparkles className="w-2.5 h-2.5 text-[#B03031]/40 mt-1" />
                  <p className="text-[12px] text-[#B03031]/70 leading-relaxed font-bold tracking-wider">"{b}"</p>
                </div>
              ))}
            </motion.div>
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#EFE6DA]/80 to-transparent pointer-events-none z-20" />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#EFE6DA]/80 to-transparent pointer-events-none z-20" />
          </div>
        </div>

        <div className="text-center mt-auto">
           <div className="text-lg font-brush text-[#B03031] opacity-40 italic tracking-widest">薪火志愿者协会</div>
           <p className="text-[7px] text-[#B03031]/10 font-black tracking-[0.5em] mt-1 uppercase">Eternal Flame • CQUPT</p>
        </div>
      </motion.div>

      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            <div className="bg-[#B03031] text-white px-6 py-3 rounded-2xl flex items-center shadow-2xl font-black text-xs">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              祝福已传递
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
