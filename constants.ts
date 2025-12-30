
import { ReportData, SeasonData } from './types';

// Added darkGold property to fix reference errors in VolunteeringModule and HighlightsModule
export const COLORS = {
  red: '#B03031',
  yellow: '#FBC84B',
  green: '#529850',
  blue: '#3C4EB2',
  cream: '#F5F0E1',
  white: '#FFFFFF',
  darkGold: '#B8860B'
};

export const REPORT_DATA: ReportData = {
  totalActivities: 85,
  avgDaysPerActivity: 4,
  totalParticipants: 1600,
  avgParticipants: 20,
  partnerRankings: [
    { rank: 1, name: "静水社工", count: 31 },
    { rank: 2, name: "南山街道社区卫生服务中心", count: 30 },
    { rank: 3, name: "长生桥社工站", count: 16 },
    { rank: 4, name: "久久公益", count: 8 },
    { rank: 5, name: "南岸区绿荫社会工作服务中心", count: 5 },
    { rank: 6, name: "桂花园社区 (含居委会)", count: 4 },
    { rank: 7, name: "青影红十字志愿服务队", count: 4 },
    { rank: 8, name: "南坪街道金紫街社区", count: 3 },
    { rank: 9, name: "重庆市体育局", count: 2 },
    { rank: 10, name: "渝中区团委", count: 2 }
  ],
  coverage: ["南岸区", "渝中区", "重庆两江新区"],
  activityTypes: [
    { name: "医疗协助类", value: 30 },
    { name: "宣传宣讲与调研", value: 18 },
    { name: "大型活动与旅游服务", value: 15 },
    { name: "社区关怀与助残", value: 15 },
    { name: "技能支持与媒体", value: 12 },
    { name: "环保绿化类", value: 10 }
  ],
  mediaStats: {
    xhs: 12,
    dy: 6,
    gzh: 16,
    totalViews: 1900,
    avgViews: 111,
    topArticles: ["《薪火志愿者简介》", "《叮咚！薪火志愿者协会向你发招新邀请》"]
  },
  donations: {
    total: 8500,
    details: [
      { name: "第一次募捐", amount: 3300 },
      { name: "第二次募捐", amount: 3200 },
      { name: "支付宝月捐", amount: 1000 },
      { name: "个人单独捐款", amount: 1000 }
    ]
  },
  milestones: [
    { date: "2025.03", title: "春季招新", desc: "新鲜血液注入薪火", icon: "🌱" },
    { date: "2025.05", title: "换届大会", desc: "第七届薪火人正式接棒", icon: "🤝" },
    { date: "2025.10", title: "马拉松志愿", desc: "两江新区摇滚半程马拉松服务", icon: "跑" },
    { date: "2025.12", title: "年度总结", desc: "回顾往昔，展望未来", icon: "✨" }
  ],
  outlook: [
    "深化校地合作，拓展更多优质志愿岗位",
    "提升媒体运营质量，讲好薪火公益故事",
    "完善内部管理机制，增强协会凝聚力"
  ]
};

export const SEASONS_DATA: Record<string, SeasonData> = {
  spring: { 
    title: "春季", 
    desc: "南山团建，球场挥洒汗水", 
    img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1000",
    seal: "春",
    images: ["https://picsum.photos/seed/xh_spring1/800/600", "https://picsum.photos/seed/xh_spring2/800/600"]
  },
  summer: { 
    title: "夏季", 
    desc: "老成员毕业，共度端午", 
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000",
    seal: "夏",
    images: ["https://picsum.photos/seed/xh_summer1/800/600", "https://picsum.photos/seed/xh_summer2/800/600"]
  },
  autumn: { 
    title: "秋季", 
    desc: "宣传招新，注入新活力", 
    img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1000",
    seal: "秋",
    images: ["https://picsum.photos/seed/xh_autumn1/800/600", "https://picsum.photos/seed/xh_autumn2/800/600"]
  },
  winter: { 
    title: "冬季", 
    desc: "老成员考研，静候佳音", 
    img: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=1000",
    seal: "冬",
    images: ["https://picsum.photos/seed/xh_winter1/800/600", "https://picsum.photos/seed/xh_winter2/800/600"]
  }
};

export const HIGHLIGHT_IMAGES = [
  "https://picsum.photos/seed/h1/800/600",
  "https://picsum.photos/seed/h2/800/600",
  "https://picsum.photos/seed/h3/800/600",
  "https://picsum.photos/seed/h4/800/600",
  "https://picsum.photos/seed/h5/800/600"
];

export const BGM_URL = "/bgm.mp3";
