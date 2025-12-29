
export interface PartnerRanking {
  rank: number;
  name: string;
  count: number;
}

export interface ActivityType {
  name: string;
  value: number;
}

export interface Milestone {
  date: string;
  title: string;
  desc: string;
  icon: string;
}

// Added SeasonData interface to match usage in SeasonsModule
export interface SeasonData {
  title: string;
  desc: string;
  img: string;
  seal: string;
  images: string[];
}

export interface ReportData {
  totalActivities: number;
  avgDaysPerActivity: number;
  totalParticipants: number;
  avgParticipants: number;
  partnerRankings: PartnerRanking[];
  coverage: string[];
  activityTypes: ActivityType[];
  mediaStats: {
    xhs: number;
    dy: number;
    gzh: number;
    totalViews: number;
    avgViews: number;
    topArticles: string[];
  };
  donations: {
    total: number;
    details: { name: string; amount: number }[];
  };
  // Added missing properties
  milestones: Milestone[];
  outlook: string[];
}
