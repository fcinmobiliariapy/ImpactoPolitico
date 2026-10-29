export type NewsCategory =
  | 'ultimo-momento'
  | 'politica'
  | 'congreso'
  | 'gobierno'
  | 'municipales'
  | 'economia'
  | 'investigacion'
  | 'entrevistas'
  | 'opinion'
  | 'elecciones'
  | 'internacionales'
  | 'sociedad'
  | 'deportes'
  | 'videos';

export interface NewsArticle {
  id: string;
  title: string;
  kicker: string; // Epígrafe o volanta (e.g., "SESIÓN EXTRAORDINARIA")
  summary: string; // Bajada o copete
  content: string; // Contenido completo
  category: NewsCategory;
  categoryLabel: string;
  imageUrl: string;
  imageCaption?: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  isLeadStory?: boolean; // Portada principal
  isBreaking?: boolean; // Último momento
  isFeatured?: boolean; // Destacado
  viewsCount: number;
  sharesCount: number;
  tags: string[];
  sources?: string;
}

export interface CurrencyRate {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  buyPYG: number;
  sellPYG: number;
  change24h: number; // porcentaje +/-
}

export interface CityWeather {
  city: string;
  tempC: number;
  condition: string;
  icon: string;
  humidity: number;
  windKmH: number;
}

export interface Advertisement {
  id: string;
  title: string;
  advertiser: string;
  location: 'header_top' | 'frontpage_middle' | 'sidebar' | 'in_article';
  imageUrl: string;
  targetUrl: string;
  active: boolean;
  impressions: number;
  clicks: number;
  startDate: string;
  endDate: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: 'director' | 'editor' | 'periodista' | 'publicidad';
  roleTitle: string;
  avatar: string;
  active: boolean;
  lastLogin: string;
}

export interface PortalConfig {
  portalName: string;
  slogan: string;
  googleAnalyticsId: string;
  analyticsActive: boolean;
  contactEmail: string;
  phone: string;
  address: string;
  socialLinks: {
    x: string;
    facebook: string;
    instagram: string;
    youtube: string;
    whatsapp: string;
  };
  activeLanguage: 'es' | 'en' | 'pt';
}

export interface TrafficMetric {
  activeUsersNow: number;
  pageViewsToday: number;
  avgTimeOnPage: string;
  topCities: { city: string; percent: number }[];
  referralSources: { source: string; percent: number }[];
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface WeeklyPoll {
  id: string;
  question: string;
  description?: string;
  category: string;
  options: PollOption[];
  totalVotes: number;
  active: boolean;
  closingDate: string;
  userVotedOptionId?: string;
}

export interface SocialAccount {
  id: 'facebook' | 'instagram' | 'twitter';
  name: string;
  handle: string;
  connected: boolean;
  followers: string;
  lastSync: string;
  profileUrl: string;
}

export interface SocialPost {
  id: string;
  articleId?: string;
  articleTitle?: string;
  platforms: ('facebook' | 'instagram' | 'twitter')[];
  content: string;
  imageUrl?: string;
  status: 'published' | 'scheduled' | 'draft';
  publishedAt?: string;
  scheduledFor?: string;
  metrics?: {
    impressions: number;
    likes: number;
    shares: number;
    comments: number;
  };
}

