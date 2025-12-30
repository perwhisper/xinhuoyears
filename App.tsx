
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { LoadingScreen } from './components/LoadingScreen';
import { BGMPlayer } from './components/BGMPlayer';
// Added ScrollGuide to imports
import { Slide, BigText, SmallText, itemVariants, ScrollGuide } from './components/CommonSlide';
import { NumberTicker } from './components/NumberTicker';
import { BlessingWallModule } from './components/BlessingWallModule';
import { REPORT_DATA, SEASONS_DATA, COLORS } from './constants';
import { PAGE_IMAGES, FILM_IMAGES } from './images';
import { Heart, Trophy, MapPin, Share2, Calendar, Award, Sparkles, Tent, Image as ImageIcon } from 'lucide-react';

// 通用国潮图片占位组件 - 优化：增加默认宽度感，调整阴影使大图更深邃
const PhotoLayer: React.FC<{ pageId: number; className?: string; isLarge?: boolean }> = ({ pageId, className = "", isLarge = false }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
      show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.2, ease: "easeOut", delay: 0.1 } }
    }}
    className={`relative group ${className}`}
  >
    {/* Removed glowing background for cleaner transparent look */}
    <div className="relative rounded-[2rem] overflow-hidden bg-transparent aspect-[16/10]">
      <img 
        src={PAGE_IMAGES[pageId] || `https://picsum.photos/seed/xinhuo_page_${pageId}/1000/625`} 
        className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105 drop-shadow-lg" 
        alt={`Page ${pageId}`}
        onLoad={() => window.dispatchEvent(new CustomEvent('image-loaded', { detail: pageId }))}
      />
      {/* Removed overlay gradient and text for cleaner transparent look */}
    </div>
  </motion.div>
);

const FloatingDust: React.FC<{ color?: string }> = ({ color = COLORS.yellow }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 15 }).map((_, i) => (
      <div 
        key={i} 
        className="gold-dust" 
        style={{ 
          backgroundColor: color,
          left: `${Math.random() * 100}%`, 
          top: `${Math.random() * 100 + 100}%`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${6 + Math.random() * 6}s`
        }} 
      />
    ))}
  </div>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const TOTAL_PAGES = 26;

  // Listen for image load events
  useEffect(() => {
    const handleImageLoad = (e: any) => {
      setLoadedImages(prev => {
        const newSet = new Set(prev);
        newSet.add(e.detail);
        return newSet;
      });
    };
    window.addEventListener('image-loaded', handleImageLoad);
    return () => window.removeEventListener('image-loaded', handleImageLoad);
  }, []);

  // Preload next image
  useEffect(() => {
    if (currentPage < TOTAL_PAGES - 1) {
      const nextId = currentPage + 2; // currentPage 0 -> Page 1. Next is Page 2.
      const img = new Image();
      img.src = PAGE_IMAGES[nextId] || `https://picsum.photos/seed/xinhuo_page_${nextId}/1000/625`;
    }
  }, [currentPage]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => (p >= 100 ? 100 : p + 2)); // Slower: +2 every 50ms = 2.5s total (approx)
      if (progress >= 100) setLoading(false);
    }, 50);
    return () => clearInterval(timer);
  }, [progress]);

  const handleScroll = React.useCallback((direction: number) => {
    if (isAnimating || loading) return;

    // Check if current page image is loaded before allowing Next
    // Exception: Page 24 (Index 23) "Time Film" has no single large image, so we skip the check.
    if (direction > 0 && currentPage !== 23 && !loadedImages.has(currentPage + 1)) {
       console.log(`Page ${currentPage + 1} not loaded yet`);
       return; 
    }

    const nextPage = currentPage + direction;
    if (nextPage < 0 || nextPage >= TOTAL_PAGES) return;

    setIsAnimating(true);
    setCurrentPage(nextPage);
    setTimeout(() => setIsAnimating(false), 1200);
  }, [currentPage, isAnimating, loading, loadedImages]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Threshold to avoid sensitive trackpads
      if (Math.abs(e.deltaY) > 30) {
        handleScroll(e.deltaY > 0 ? 1 : -1);
      }
    };
    window.addEventListener('wheel', onWheel);
    return () => window.removeEventListener('wheel', onWheel);
  }, [handleScroll]);

  const touchStartY = React.useRef(0);
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(dy) > 50) handleScroll(dy > 0 ? -1 : 1);
    };
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [handleScroll]);

  if (loading) return <LoadingScreen progress={progress} />;

  const PIE_COLORS = [COLORS.red, COLORS.yellow, '#E63946', '#D4AF37', COLORS.blue, COLORS.green];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#EFE6DA]">
      <BGMPlayer />
      <div 
        className="h-full w-full transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]"
        style={{ transform: `translateY(-${currentPage * 100}%)` }}
      >
        
        {/* 1. 封面页 - 调大封面图 w-64 -> w-84 */}
        <Slide bg="bg-[#EFE6DA]" className="text-[#B03031]" glowColor={COLORS.yellow}>
          <div className="pattern-overlay" />
          <FloatingDust />
          <PhotoLayer pageId={1} className="w-84 mb-12" />
          <BigText color="text-[#B03031]" className="text-2xl font-serif-bold tracking-widest">2025</BigText>
          <BigText color="text-[#B03031]" className="text-5xl font-brush">年度报告</BigText>
          <div className="h-[1px] w-16 bg-[#B03031]/30 my-6" />
          <SmallText color="text-gray-400">不忘初心，向美而行</SmallText>
        </Slide>

        {/* 2. 年度盘点开篇 - 边距 px-10 -> px-4 */}
        <Slide glowColor={COLORS.red}>
          <div className="absolute top-10 right-10 w-20 h-20 border-4 border-[#C41E3A] rounded-2xl flex items-center justify-center font-brush text-[#C41E3A] text-4xl -rotate-12 opacity-20">2025</div>
          <PhotoLayer pageId={2} className="w-full px-4 mb-10" />
          <BigText className="text-6xl gold-gradient-text italic mb-4">2025</BigText>
          <BigText className="text-2xl">年已经接近尾声，</BigText>
          <BigText className="text-2xl mt-2">现在为人们揭秘</BigText>
          <BigText className="text-2xl gold-gradient-text mt-2 font-serif-bold">2025 年薪火年度盘点</BigText>
        </Slide>

        {/* 3. 活动场次 - 边距 px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]" className="text-[#B03031]">
          <PhotoLayer pageId={3} className="w-full px-4 mb-10" />
          <BigText color="text-[#B03031]" className="text-xl">这一年我们发布和开展</BigText>
          <BigText color="text-[#B03031]" className="text-xl">志愿者活动超</BigText>
          <div className="flex items-end justify-center my-4">
             <span className="text-9xl font-serif-bold gold-gradient-text leading-none italic">85</span>
             <span className="text-3xl ml-4 mb-2">场</span>
          </div>
          <SmallText color="text-[#B03031]/60" className="text-lg">平均每四天开展一场</SmallText>
        </Slide>

        {/* 4. 志愿者人数 - 边距 px-10 -> px-4 */}
        <Slide glowColor={COLORS.green}>
          <PhotoLayer pageId={4} className="w-full px-4 mb-10" />
          <BigText className="text-xl">这一年我们累计</BigText>
          <BigText className="text-xl">招募组织志愿者约</BigText>
          <div className="flex items-end justify-center my-4">
             <span className="text-9xl font-serif-bold text-[#C41E3A] leading-none italic">1600</span>
             <span className="text-3xl ml-4 mb-2">人</span>
          </div>
          <SmallText color="text-gray-400" className="text-lg">平均每次活动约 20 人参与</SmallText>
        </Slide>

        {/* 5. 合作组织数量 - 边距 px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]" className="text-[#B03031]">
          <PhotoLayer pageId={5} className="w-full px-4 mb-10" />
          <BigText color="text-[#B03031]" className="text-xl leading-relaxed">这一年和 <span className="text-[#FBC84B] text-6xl italic mx-2">11</span> 个组织合作联系</BigText>
          <div className="mt-8 px-12 text-[#B03031]/60 text-base leading-relaxed font-bold">
            这些组织有社工组织，<br/>也有政府单位和其他
          </div>
        </Slide>

        {/* 6. 排行榜 - 调大 w-56 -> w-72 */}
        <Slide className="bg-[#EFE6DA]">
          <BigText className="text-2xl mb-8 gold-gradient-text font-serif-bold">和我们合作最密切的组织排行榜</BigText>
          <div className="w-full max-w-sm px-6 mb-8 overflow-y-auto no-scrollbar max-h-[40vh]">
            {REPORT_DATA.partnerRankings.slice(0, 8).map((p, i) => (
              <motion.div key={i} variants={itemVariants} className={`flex justify-between items-center p-3 rounded-xl mb-2 ${i < 3 ? 'bg-[#C41E3A]/5 border border-[#C41E3A]/10' : 'bg-white/40 shadow-sm'}`}>
                <span className="text-xs font-serif-bold text-[#C41E3A] w-6">{p.rank}</span>
                <span className="flex-1 text-[11px] font-bold text-gray-600 truncate px-2">{p.name}</span>
                <span className="text-xs font-serif-bold gold-gradient-text">{p.count}次</span>
              </motion.div>
            ))}
          </div>
          <PhotoLayer pageId={6} className="w-72" />
        </Slide>

        {/* 7. 志愿者覆盖范围 - px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]">
          <PhotoLayer pageId={7} className="w-full px-4 mb-10" />
          <BigText color="text-[#B03031]" className="text-2xl mb-10">我们的主要服务地点在</BigText>
          <div className="space-y-4">
            {["南岸区", "渝中区", "重庆两江新区"].map((area, i) => (
              <motion.div key={i} variants={itemVariants} className="text-4xl font-serif-bold gold-gradient-text tracking-widest">{area}</motion.div>
            ))}
          </div>
        </Slide>

        {/* 8. 活动类型 (饼图) - w-48 -> w-64 */}
        <Slide bg="bg-[#EFE6DA]">
          <BigText className="text-3xl gold-gradient-text mb-8 font-brush">我们的活动类型</BigText>
          <div className="h-56 w-full relative mb-8" style={{ minHeight: '224px', minWidth: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={REPORT_DATA.activityTypes} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} cornerRadius={8} dataKey="value">
                  {REPORT_DATA.activityTypes.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <PhotoLayer pageId={8} className="w-64 mb-6" />
          <div className="grid grid-cols-2 gap-3 px-8 w-full max-w-sm">
            {REPORT_DATA.activityTypes.slice(0,4).map((t, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                <span className="text-[10px] font-bold text-gray-500">{t.name}</span>
              </div>
            ))}
          </div>
        </Slide>

        {/* 9. 最具影响力活动 - px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]">
          <PhotoLayer pageId={9} className="w-full px-4 mb-10" />
          <BigText color="text-[#B03031]" className="text-lg opacity-60">最具影响力的活动</BigText>
          <BigText color="text-[#FFD700]" className="text-3xl leading-snug my-4 px-10 font-serif-bold drop-shadow-sm">“重庆两江新区摇滚半程马拉松”</BigText>
          <div className="space-y-2 mt-6">
             <BigText color="text-[#B03031]" className="text-xl">志愿者超百人</BigText>
             <BigText color="text-[#B03031]" className="text-xl">时间持续 3 天</BigText>
          </div>
        </Slide>

        {/* 10. 志愿者交流群 - px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]">
          <div className="text-6xl font-brush absolute top-10 left-10 text-[#B03031]/5 select-none">集结</div>
          <PhotoLayer pageId={10} className="w-full px-4 mb-10" />
          <BigText color="text-[#B03031]" className="text-xl">这一年超 <span className="text-[#FBC84B] text-7xl font-serif-bold italic mx-2">1500</span> 名志愿者</BigText>
          <BigText color="text-[#B03031]" className="text-xl mt-4">加入到薪火志愿者交流群</BigText>
        </Slide>

        {/* 11. 媒体账号发力 - px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]">
          <PhotoLayer pageId={11} className="w-full px-4 mb-10" />
          <BigText color="text-[#B03031]" className="text-xl leading-relaxed">这一年，我们的各媒体账号<br/>也在不断发力：</BigText>
          <div className="flex justify-center space-x-10 mt-10">
            {["公众号", "抖音", "小红书"].map((p, i) => (
               <motion.div key={i} variants={itemVariants} className="flex flex-col items-center">
                 <div className="w-14 h-14 rounded-2xl bg-white/40 backdrop-blur-md border border-[#B03031]/10 flex items-center justify-center text-[#B03031] font-brush text-2xl shadow-sm">{p[0]}</div>
                 <span className="mt-2 text-xs font-bold text-[#B03031]/50">{p}</span>
               </motion.div>
            ))}
          </div>
        </Slide>

        {/* 12. 媒体发布数量 - w-48 -> w-72 */}
        <Slide bg="bg-[#EFE6DA]" className="text-[#B03031]">
          <div className="space-y-12 w-full px-12 text-left">
            <motion.div variants={itemVariants}>
              <span className="text-[#B03031]/30 text-xs block mb-2 tracking-[0.3em] uppercase">Little Red Book</span>
              <span className="text-4xl font-serif-bold gold-gradient-text">小红书发布 12 篇</span>
            </motion.div>
            <motion.div variants={itemVariants}>
              <span className="text-[#B03031]/30 text-xs block mb-2 tracking-[0.3em] uppercase">Douyin</span>
              <span className="text-4xl font-serif-bold gold-gradient-text">抖音发布 6 条</span>
            </motion.div>
            <motion.div variants={itemVariants}>
              <span className="text-[#B03031]/30 text-xs block mb-2 tracking-[0.3em] uppercase">WeChat</span>
              <span className="text-4xl font-serif-bold gold-gradient-text">公众号发布 16 篇</span>
            </motion.div>
          </div>
          <PhotoLayer pageId={12} className="w-72 mt-12" />
        </Slide>

        {/* 13. 公众号阅读量 - px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]">
          <PhotoLayer pageId={13} className="w-full px-4 mb-10" />
          <div className="space-y-12">
            <motion.div variants={itemVariants}>
              <BigText className="text-xl">其中公众号阅读量超</BigText>
              <div className="text-8xl font-serif-bold text-[#C41E3A]">1900</div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <BigText className="text-lg">平均每篇公众号文章阅读量为</BigText>
              <div className="text-6xl font-serif-bold gold-gradient-text font-serif-bold">111</div>
            </motion.div>
          </div>
        </Slide>

        {/* 14. 年度热门推文 - w-64 -> w-84 */}
        <Slide bg="bg-[#EFE6DA]">
          <BigText className="text-xl mb-10 font-serif-bold">公众号年度最受关注推文：</BigText>
          <div className="w-full max-w-sm px-8 space-y-6 mb-8">
            {["薪火志愿者简介", "叮咚！薪火志愿者协会向你发招新邀请"].map((art, i) => (
              <motion.div key={i} variants={itemVariants} className="p-6 bg-white/50 rounded-3xl border-r-8 border-[#C41E3A] shadow-xl text-left backdrop-blur-sm">
                <p className="font-serif-bold text-[#C41E3A] text-base leading-relaxed">《{art}》</p>
              </motion.div>
            ))}
          </div>
          <PhotoLayer pageId={14} className="w-84" />
        </Slide>

        {/* 15. 年度改变总起 - px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]">
           <div className="text-[12rem] font-brush absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#B03031]/5 select-none pointer-events-none">变</div>
           <PhotoLayer pageId={15} className="w-full px-4 mb-10" />
           <BigText color="text-[#B03031]" className="text-3xl tracking-widest">这一年，我们也</BigText>
           <BigText color="text-[#FBC84B]" className="text-5xl font-brush mt-4 italic drop-shadow-sm">发生了许多改变</BigText>
        </Slide>

        {/* 16. 工作室搬迁 - px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]">
          <PhotoLayer pageId={16} className="w-full px-4 mb-10" />
          <Tent className="w-16 h-16 text-[#3C4EB2] mb-6" />
          <BigText className="text-3xl font-serif-bold">薪火工作室地点搬迁，</BigText>
          <BigText className="text-3xl gold-gradient-text font-serif-bold mt-2">有了新的工作地点</BigText>
        </Slide>

        {/* 17. 竞赛鼓励金 - w-48 -> w-72 */}
        <Slide bg="bg-[#EFE6DA]">
          <div className="pattern-overlay" />
          <Award className="w-16 h-16 text-[#FBC84B] mb-6" />
          <BigText color="text-[#B03031]" className="text-2xl px-10 leading-relaxed">由老成员资助，成立了</BigText>
          <BigText color="text-[#B03031]" className="text-5xl font-brush my-6">薪火竞赛鼓励金</BigText>
          <BigText color="text-[#B03031]/40" className="text-lg">激励大家更好发展</BigText>
          <PhotoLayer pageId={17} className="w-72 mt-10" />
        </Slide>

        {/* 18. 换届 - px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]">
          <PhotoLayer pageId={18} className="w-full px-4 mb-10" />
          <BigText color="text-[#B03031]" className="text-4xl font-serif-bold">5 月 25 日</BigText>
          <BigText color="text-[#B03031]" className="text-5xl font-brush my-8">换届</BigText>
          <BigText color="text-[#B03031]/60" className="text-3xl font-serif-bold italic tracking-[0.2em]">第七届接力</BigText>
        </Slide>

        {/* 19. 四季总起 - px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]">
          <PhotoLayer pageId={19} className="w-full px-4 mb-10" />
          <BigText className="text-3xl">时光流逝，</BigText>
          <BigText className="text-4xl gold-gradient-text font-brush my-6">我们的身影藏在四季里</BigText>
        </Slide>

        {/* 20. 春季 - px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]" glowColor={COLORS.green}>
          <div className="text-[12rem] font-brush absolute top-20 right-10 text-[#C41E3A]/5">春</div>
          <PhotoLayer pageId={20} className="w-full px-4 mb-10" />
          <BigText color="text-green-700" className="text-4xl font-brush">春季：</BigText>
          <BigText className="text-2xl mt-6 text-[#B03031]">南山团建，球场挥洒汗水</BigText>
        </Slide>

        {/* 21. 夏季 - px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]">
          <div className="text-[12rem] font-brush absolute top-20 right-10 text-[#B03031]/5">夏</div>
          <PhotoLayer pageId={21} className="w-full px-4 mb-10" />
          <BigText color="text-[#B03031]" className="text-4xl font-brush">夏季：</BigText>
          <BigText color="text-[#B03031]" className="text-2xl mt-6">老成员毕业，共度端午</BigText>
        </Slide>

        {/* 22. 秋季 - px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]">
          <div className="text-[12rem] font-brush absolute top-20 right-10 text-[#B03031]/5">秋</div>
          <PhotoLayer pageId={22} className="w-full px-4 mb-10" />
          <BigText color="text-[#B03031]" className="text-4xl font-brush">秋季：</BigText>
          <BigText color="text-[#B03031]" className="text-2xl mt-6">宣传招新，注入新活力</BigText>
        </Slide>

        {/* 23. 冬季 - px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]">
          <div className="text-[12rem] font-brush absolute top-20 right-10 text-[#B03031]/5">冬</div>
          <PhotoLayer pageId={23} className="w-full px-4 mb-10" />
          <BigText color="text-[#B03031]" className="text-4xl font-brush">冬季：</BigText>
          <BigText color="text-[#B03031]" className="text-2xl mt-6">老成员考研</BigText>
        </Slide>

        {/* 24. 时间胶片 - 调大胶片宽度 */}
        <Slide bg="bg-[#EFE6DA]">
           <BigText color="text-[#B03031]" className="text-4xl font-brush mb-10">时间胶片</BigText>
           <motion.div animate={{ x: [0, -800, 0] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="flex space-x-8 py-4">
            {FILM_IMAGES.map((imgUrl, i) => (
              <div key={i} className="w-64 h-80 bg-white p-4 rounded-sm shadow-2xl shrink-0 -rotate-2 transform-gpu border-b-8 border-gray-100">
                <img src={imgUrl} className="w-full h-64 object-cover" alt={`Film ${i + 1}`} />
                <div className="mt-4 text-[7px] font-mono text-gray-400">2025_MEM_ARCHIVE_{i + 1}</div>
              </div>
            ))}
          </motion.div>
          <ScrollGuide light={false} />
        </Slide>

        {/* 25. 捐赠支持总起 - px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]">
          <PhotoLayer pageId={25} className="w-full px-4 mb-10" />
          <Heart className="w-16 h-16 text-[#C41E3A] fill-[#C41E3A] mb-8 animate-pulse" />
          <BigText className="text-3xl leading-relaxed text-[#B03031]">支持我们走下去的是<br/><span className="gold-gradient-text font-brush text-5xl mt-4 block">大家的捐赠和支持</span></BigText>
        </Slide>

        {/* 26. 捐款总额 - px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]">
           <PhotoLayer pageId={26} className="w-full px-4 mb-10" />
           <BigText color="text-[#B03031]" className="text-3xl">这年累计收到捐款</BigText>
           <div className="text-[8rem] font-serif-bold gold-gradient-text italic leading-none my-4">
             <NumberTicker value={8500} />
           </div>
           <BigText color="text-[#B03031]" className="text-2xl">RMB</BigText>
        </Slide>

        {/* 27. 捐款明细 - w-48 -> w-72 */}
        <Slide bg="bg-[#EFE6DA]">
          <div className="w-full max-w-sm space-y-3 px-6 mb-10">
            {[
              { label: "第一次募捐到金额约", value: "3300" },
              { label: "第二次募捐到约", value: "3200" },
              { label: "支付宝收到募捐约", value: "1000" },
              { label: "个人单独捐款", value: "1000" }
            ].map((d, i) => (
              <motion.div key={i} variants={itemVariants} className="flex justify-between items-center p-4 bg-white/60 rounded-2xl border-l-8 border-[#529850] shadow-md backdrop-blur-sm">
                <span className="font-bold text-gray-400 text-[11px]">{d.label}</span>
                <span className="text-xl font-serif-bold text-[#529850]">{d.value}</span>
              </motion.div>
            ))}
          </div>
          <PhotoLayer pageId={27} className="w-72" />
          <p className="mt-8 text-[9px] text-gray-400 font-bold px-10">由于统计等原因，和实际数量可能存在偏差</p>
        </Slide>

        {/* 28. 过渡补位 - px-10 -> px-4 */}
        <Slide bg="bg-[#EFE6DA]">
           <PhotoLayer pageId={28} className="w-full px-4 mb-12" />
           <BigText className="text-3xl italic gold-gradient-text opacity-40 font-brush">不忘初心 ・ 薪火长存</BigText>
        </Slide>

        {/* 29. 2025→2026 过渡 */}
        <Slide bg="bg-[#EFE6DA]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20" />
          <div className="flex flex-col items-center justify-center relative h-64 w-full">
             <motion.div animate={{ opacity: [1, 0], scale: [1, 2.5] }} transition={{ delay: 1, duration: 1.5 }} className="text-[12rem] font-serif-bold gold-gradient-text absolute">2025</motion.div>
             <motion.div initial={{ opacity: 0, scale: 0.2 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.5, duration: 1.5 }} className="text-[8rem] font-serif-bold text-[#B03031] absolute">2026</motion.div>
          </div>
          <BigText color="text-[#B03031]" className="mt-24 text-2xl">2025 年即将到站，</BigText>
          <BigText color="#FBC84B" className="text-4xl font-brush drop-shadow-sm">2026 年更精彩</BigText>
        </Slide>

        {/* 30. 祝福页 */}
        <Slide id="blessing" className="p-0" bg="bg-[#EFE6DA]">
          <BlessingWallModule title="送上你的 2026 祝福" />
        </Slide>

      </div>
      <ScrollGuide light={false} />
    </div>
  );
};

export default App;
